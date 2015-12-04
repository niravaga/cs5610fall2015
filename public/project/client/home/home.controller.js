(function () {
	angular
		.module("TripPlannerApp")
		.controller("HomeController", HomeController);

	function HomeController($location, TripService) {

		var model = this;

		model.createTrip = createTrip;
		model.searchTrips = searchTrips;

		function createTrip() {
			console.log("Creating trip for city" + model.city);

			var trip = { city: model.city };

			TripService
				.createTrip(trip)
				.then(function (trip) {
					// console.log(trip._id);
					$location.url("/trip-create/" + trip._id);
				});

			// $http
			// .get("https://maps.googleapis.com/maps/api/geocode/json?address="+ model.city +"&key=AIzaSyBbtkDxjuDPKJJev18t5TEnAGn0t9h-YrQ")
			// .then(function (response) {
			// 	$scope.response = response;
			// 	// $location.url("/trip-create");
			// });
		}

		function searchTrips () {
			console.log("Searching trips");
			$location.url("/trip-search");
		}
	}
})();