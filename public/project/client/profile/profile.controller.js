"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.controller("profileController", profileController);

	function profileController($rootScope, UserService, TripService) {

		var model = this;
		model.currentUser = $rootScope.currentUser;

		model.deleteTrip = deleteTrip;

		function init() {
			TripService
				.findTripsForUser(model.currentUser._id)
				.then(function (trips) {
					model.trips = trips;
				});
		}

		init();

		function deleteTrip(tripId) {
			TripService
				.deleteTrip(tripId)
				.then(init);
		}
	}
})();