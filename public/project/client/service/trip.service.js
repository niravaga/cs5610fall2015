(function () {
	angular
		.module("TripPlannerApp")
		.factory("TripService", TripService);

	function TripService($http, $q) {
		var trips = [];

		var api = {
			createTrip: createTrip,
			findAllTrips: findAllTrips,
			findTripById: findTripById,
			findTripsByUsername: findTripsByUsername,
			findAllTripsForCity: findAllTripsForCity,
			addDayToTrip: addDayToTrip,
			deleteDay: deleteDay,
			deletePlace: deletePlace,
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

		function findTripsByUsername(curUsername) {
			var userTrips = [];
			for (var i in trips) {
				if (trips[i].username == curUsername)
					userTrips.push(trips[i]);
			}
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

		function updateTrip(newTrip) {

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

		function deleteTrip() {

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

		function deletePlace(tripId, dayIndex, placeIndex) {
			var deferred = $q.defer();

			$http
				.delete("/api/project/trip/" + tripId + "/day/" + dayIndex + "/place/" + placeIndex)
				.then(function (trip) {
					deferred.resolve(trip.data);
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