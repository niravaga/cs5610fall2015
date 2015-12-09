"use strict";

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
				.get("/api/project/place/" + name)
				.then(function (place) {
					console.log(place);
					deferred.resolve(place.data[0]);
				});

			return deferred.promise;
		}

		function findPlaceDetails(placeId) {
			var deferred = $q.defer();

			$http
				.get("/api/project/place/" + name + "/details")
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
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}
	}
})();