"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.controller("HeaderController", HeaderController);

	function HeaderController(UserService, $rootScope, $location) {
		var model = this;
		model.location = $location;

		model.logout = logout;
		
		// if ($rootScope.currentUser && $rootScope.currentUser.role == "ADMIN")
			model.admin = true;

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