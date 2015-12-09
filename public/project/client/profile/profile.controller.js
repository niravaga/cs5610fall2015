"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.controller("profileController", profileController);

	function profileController($rootScope, UserService, TripService) {

		var model = this;
		model.currentUser = $rootScope.currentUser;

		model.deleteTrip = deleteTrip;
		model.update = updateUser;
		
		function init() {
			TripService
				.findTripsForUser(model.currentUser._id)
				.then(function (trips) {
					model.trips = trips;
				});
		}

		init();
		
		function updateUser(updatedUser) {
			UserService
				.updateUser(model.currentUser._id, updatedUser)
				.then(function (user) {
					model.message = "Profile Updated"
				});
		}

		function deleteTrip(tripId) {
			TripService
				.deleteTrip(tripId)
				.then(init);
		}
	}
})();