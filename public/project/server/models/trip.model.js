var q = require("q");

module.exports = function (mongoose, db) {
	var TripSchema = require ("./trip.schema.js")(mongoose);
	var TripModel = mongoose.model("TripModel", TripSchema);

	var api = {
		createTrip: createTrip
	};

	return api;

	function createTrip(newTrip) {
		var deferred = q.defer();

		TripModel.create(newTrip, function(err, trip) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(trip);
		});

		return deferred.promise;
	}
}