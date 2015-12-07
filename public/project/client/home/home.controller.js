(function () {
	angular
		.module("TripPlannerApp")
		.controller("HomeController", HomeController);

	function HomeController($location, $rootScope, TripService) {

		var model = this;

		model.createTrip = createTrip;
		model.searchTrips = searchTrips;

		function createTrip() {
			console.log("Creating trip for city " + model.city);

			var trip = {
				city: model.city,
				userId: $rootScope.currentUser._id
			};

			TripService
				.createTrip(trip)
				.then(function (trip) {
					// console.log(trip._id);
					$location.url("/trip-create/" + trip._id);
				});
		}

		function searchTrips(city) {
			console.log("Searching trips");
			$location.url("/trip-search/" + city);
		}
	}
})();