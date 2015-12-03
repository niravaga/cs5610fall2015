(function () {
	angular
	.module("TripPlannerApp")
	.factory("TripService", TripService);

	function TripService($http, $q) {
		var trips = [];
		
		var api = {
			createTrip: createTrip,
			findAllTrips: findAllTrips,
			findTripsByUsername: findTripsByUsername,
			updateTrip: updateTrip,
			deleteTrip: deleteTrip
		}
		
		return api;
		
		function createTrip(newTrip) {
			var deferred = $q.defer();

			$http
			.post("/api/project/trip", newTrip)
			.success(function(trip){
				deferred.resolve(trip);
			});

			return deferred.promise;
		}
		
		function findAllTrips() {
			var deferred = $q.defer();

			$http
			.get("/api/project/trip")
			.success(function(trips){
				deferred.resolve(trips);
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
		
		function updateTrip(newTrip) {
			
		}
		
		function deleteTrip() { 
			
		}
		
	}
}) ();