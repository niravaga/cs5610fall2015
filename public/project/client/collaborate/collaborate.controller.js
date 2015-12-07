(function () {
	angular
		.module("TripPlannerApp")
		.controller("CollabController", CollabController);

	function CollabController($rootScope, $routeParams, TripService, UserService) {
		var model = this;

		var tripId = $routeParams.tripId;

		model.addCollaborator = addCollaborator;
		model.deleteCollaborator = deleteCollaborator;
		model.newUsername = null;

		function init() {
			TripService
				.findTripById(tripId)
				.then(function (trip) {
					model.trip = trip;
					console.log(model.trip);
				});
		}

		init();

		function addCollaborator(newUsername) {
			UserService
				.findUserByUsername(newUsername)
				.then(function (user) {
					if (user) {
						TripService
							.addCollaborator(tripId, user)
							.then(function (trip) {
								model.trip = trip;
								model.errMessage = null;
							});
					}
					else {
						model.errMessage = "The user does not exist";
					}
				});
		}

		function deleteCollaborator(index) {
			TripService
				.deleteCollaborator(tripId, index)
				.then(function (trip) {
					model.trip = trip;
				});
		}
	}
})();