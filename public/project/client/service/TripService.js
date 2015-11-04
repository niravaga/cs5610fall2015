(function () {
	angular
		.module("TripPlannerApp")
		.factory("TripService", TripService);
		
	function TripService() {
		var trips = [];
		
		var service = {
			createTrip: createTrip,
			findAllTrips: findAllTrips,
			findTripsByUsername: findTripsByUsername,
			updateTrip: updateTrip,
			deleteTrip: deleteTrip
		}
		
		return service;
		
		function createTrip(curTrip, callback) {
			trips.push(curTrip);
			callback(curTrip);
		}
		
		function findAllTrips(callback) {
			callback(trips);
		}
		
		function findTripsByUsername(curUsername, callback) {
			var userTrips = [];
			for (var i in trips) {
				if (trips[i].username == curUsername)
					userTrips.push(trips[i]);
			}
			
			callback(userTrips);
		}
		
		function updateTrip(newTrip) {
			
		}
		
		function deleteTrip() { 
			
		}
		
	}
}) ();