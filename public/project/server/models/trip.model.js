var q = require("q");

module.exports = function (mongoose, db) {
	var TripSchema = require("./trip.schema.js")(mongoose);
	var TripModel = mongoose.model("TripModel", TripSchema);

	var api = {
		createTrip: createTrip,
		findTripById: findTripById,
		addDayToTrip: addDayToTrip,
		addPlace: addPlace,
		findAllTripsForCity: findAllTripsForCity,
		deletePlace: deletePlace,
		deleteDay: deleteDay,
		addCollaborator: addCollaborator,
		deleteCollaborator: deleteCollaborator
	};

	return api;

	function createTrip(newTrip) {
		var deferred = q.defer();

		newTrip["days"] = [];
		newTrip["collaborators"] = [];
		addDay(newTrip);

		TripModel.create(newTrip, function (err, trip) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(trip);
		});

		return deferred.promise;
	}

	function addDay(trip) {
		var temp = [];
		var init = { places: temp };
		trip["days"].push(init);
	}

	function addDayToTrip(tripId) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {
			if (err)
				deferred.reject(err);
			else {
				addDay(trip);
				trip.save(function (err, form) {
					if (err)
						deferred.reject(err);
					else
						deferred.resolve(trip);
				});
			}
		});

		return deferred.promise;
	}

	function addPlace(tripId, dayIndex, place) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {
			trip.days[dayIndex].places.push(place);

			console.log(trip);
			trip.save(function (err, trip) {
				if (err)
					deferred.reject(err);
				else
					deferred.resolve(trip);
			});
		});

		return deferred.promise;
	}

	function findTripById(tripId) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(trip);
		});

		return deferred.promise;
	}

	function findAllTripsForCity(city) {
		var deferred = q.defer();

		TripModel.find({ city: city }, function (err, trips) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(trips);
		});

		return deferred.promise;
	}

	function deletePlace(tripId, dayIndex, placeIndex) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {
			trip.days[dayIndex].places.splice(placeIndex, 1);

			trip.save(function (err, trip) {
				if (err)
					deferred.reject(err);
				else
					deferred.resolve(trip);
			});
		})

		return deferred.promise;
	}

	function deleteDay(tripId, dayIndex) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {
			trip.days.splice(dayIndex, 1);

			trip.save(function (err, trip) {
				if (err)
					deferred.reject(err);
				else
					deferred.resolve(trip);
			});
		})

		return deferred.promise;
	}

	function addCollaborator(tripId, username) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {

			if (trip.collaborators.indexOf(username) == -1)
				trip.collaborators.push(username);

			trip.save(function (err, trip) {
				if (err)
					deferred.reject(err);
				else
					deferred.resolve(trip);
			});
		})

		return deferred.promise;
	}

	function deleteCollaborator(tripId, index) {
		var deferred = q.defer();

		TripModel.findById(tripId, function (err, trip) {
			trip.collaborators.splice(index, 1);

			trip.save(function (err, trip) {
				if (err)
					deferred.reject(err);
				else
					deferred.resolve(trip);
			});
		})

		return deferred.promise;
	}

}