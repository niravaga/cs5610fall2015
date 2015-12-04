(function () {
	angular
		.module("TripPlannerApp")
		.factory("PlaceService", PlaceService);

	function PlaceService($http, $q) {
		var api = {
			findPlace: findPlace,
			addPlace: addPlace
		};

		return api;

		function findPlace(name) {
			var deferred = $q.defer();

			$http
				.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyBbtkDxjuDPKJJev18t5TEnAGn0t9h-YrQ")
				.then(function (place) {
					deferred.resolve(place);
				});

			return deferred.promise;
		}

		function addPlace(tripId, dayIndex, place) {
			var deferred = $q.defer();

			$http
				.post("/api/project/trip/" + tripId + "/day/" + dayIndex + "/place", place)
				.then(function (trip) {
					console.log(trip);
					deferred.resolve(trip);
				});

			return deferred.promise;
		}
	}
})();