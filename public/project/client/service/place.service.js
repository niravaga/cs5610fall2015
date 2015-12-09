"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.factory("PlaceService", PlaceService);

	function PlaceService($http, $q) {
		var api = {
			findPlace: findPlace,
			addPlace: addPlace,
			findPlaceDetails: findPlaceDetails,
			findPlaceListDetails: findPlaceListDetails
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
				.get("/api/project/place/" + placeId + "/details")
				.then(function (place) {
					deferred.resolve(place.data);
				});

			return deferred.promise;
		}

		function findPlaceListDetails(placeIds) {
			var promises = [];

			for (var i in placeIds) {
				promises.push(findPlaceDetails(placeIds[i]));
			}

			return $q.all(promises);
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