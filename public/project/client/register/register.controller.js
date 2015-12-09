"use strict";

(function () {

	angular
		.module("TripPlannerApp")
		.controller("RegisterController", RegisterController);

	function RegisterController($rootScope, $location, UserService) {

		var model = this;

		model.register = register;


		function register() {
			console.log(model.newUser);
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
					}
				}, function (err) {
					model.message = "The username has already been taken";
				});
		}
	}
})();