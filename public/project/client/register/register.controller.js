"use strict";

(function () {

	angular
		.module("TripPlannerApp")
		.controller("RegisterController", RegisterController);

	function RegisterController($rootScope, $location, UserService) {

		var model = this;

		model.register = register;


		function register() {
			UserService
				.createUser(model.newUser)
				.then(userCreated);
		}

		function userCreated(users) {
			UserService
				.login(model.newUser)
				.then(function (response) {
					if (response != null) {
						$rootScope.currentUser = response;
						$location.url("/profile");
					} else {
						model.message = "Invalid username or pasword";
					}
				});
		}
	}
})();