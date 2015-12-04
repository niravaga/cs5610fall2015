(function () {
	angular
		.module("TripPlannerApp")
		.controller("tripSearchController", tripSearchController);

	function tripSearchController($routeParams, TripService) {
		var model = this;
		var city = $routeParams.city;

		function init() {
			TripService
				.findAllTripsForCity(city)
				.then(function (trips) {
					model.trips = trips;
					console.log(trips);
				});
		}

		init();
	}
})();