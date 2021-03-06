"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.factory("TripService", TripService);

	function TripService($http, $q) {

		var api = {
			createTrip: createTrip,
			findAllTrips: findAllTrips,
			findTripById: findTripById,
			findTripsForUser: findTripsForUser,
			findAllTripsForCity: findAllTripsForCity,
			addDayToTrip: addDayToTrip,
			deleteDay: deleteDay,
			updateTrip: updateTrip,
			deleteTrip: deleteTrip,
			addCollaborator: addCollaborator,
			deleteCollaborator: deleteCollaborator
		};

		return api;

		function createTrip(newTrip) {
			var deferred = $q.defer();

			$http
				.post("/api/project/trip", newTrip)
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}

		function findAllTrips() {
			var deferred = $q.defer();

			$http
				.get("/api/project/trip")
				.then(function (trips) {
					deferred.resolve(trips.data);
				});

			return deferred.promise;
		}

		function findTripsForUser(userId) {
			var deferred = $q.defer();

			$http
				.get("/api/project/trip/user/" + userId)
				.then(function (trips) {
					deferred.resolve(trips.data);
				});

			return deferred.promise;
		}

		function findTripById(tripId) {
			var deferred = $q.defer();

			$http
				.get("/api/project/trip/" + tripId)
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}

		function updateTrip(tripId, newTrip) {
			var deferred = $q.defer()

			$http
				.put("/api/project/trip/" + tripId, newTrip)
				.then(function (response) {
					deferred.resolve(response);
				});

			return deferred.promise;

		}

		function addDayToTrip(tripId) {
			var deferred = $q.defer();

			console.log(tripId);
			$http
				.post("/api/project/trip/" + tripId + "/day/")
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}

		function deleteTrip(tripId) {
			var deferred = $q.defer();

			$http
				.delete("/api/project/trip/" + tripId)
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}

		function findAllTripsForCity(city) {
			var deferred = $q.defer();

			$http
				.get("/api/project/trip/city/" + city)
				.then(function (trips) {
					deferred.resolve(trips.data);
				});

			return deferred.promise;
		}

		function deleteDay(tripId, dayIndex) {
			var deferred = $q.defer();

			$http
				.delete("/api/project/trip/" + tripId + "/day/" + dayIndex)
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}

		function addCollaborator(tripId, user) {
			var deferred = $q.defer();

			$http
				.post("/api/project/trip/" + tripId + "/collaborator/", user)
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}

		function deleteCollaborator(tripId, index) {
			var deferred = $q.defer();

			$http
				.delete("/api/project/trip/" + tripId + "/collaborator/" + index)
				.then(function (trip) {
					deferred.resolve(trip.data);
				});

			return deferred.promise;
		}
	}
})();