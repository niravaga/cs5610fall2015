"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.controller("HeaderController", HeaderController);

	function HeaderController(UserService, $rootScope, $location) {
		var model = this;
		model.location = $location;

		console.log($rootScope.currentUser);

		model.logout = logout;

		function logout() {
			UserService
				.logout()
				.then(function () {
					$rootScope.currentUser = null;
					$location.url("/home");
				});
		}
	}
})();