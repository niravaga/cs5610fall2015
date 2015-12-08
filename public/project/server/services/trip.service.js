module.exports = function (app, model) {
	app.post("/api/project/trip", createTrip);
	app.get("/api/project/trip/:tripId", findTripById);
	app.post("/api/project/trip/:tripId/day", addDayToTrip);
	app.get("/api/project/trip/city/:city", findAllTripsForCity);
	app.get("/api/project/trip/user/:userId", findTripsForUser);
	app.delete("/api/project/trip/:tripId/day/:dayIndex/place/:placeIndex", deletePlace);
	app.delete("/api/project/trip/:tripId/day/:dayIndex", deleteDay);
	app.delete("/api/project/trip/:tripId", deleteTrip);
	app.post("/api/project/trip/:tripId/collaborator/", addCollaborator);
	app.delete("/api/project/trip/:tripId/collaborator/:index", deleteCollaborator);

	function createTrip(req, res) {
		var newTrip = req.body;

		model
			.createTrip(newTrip)
			.then(function (trip) {
				res.json(trip);
			});
	}

	function findTripById(req, res) {
		var tripId = req.params.tripId;

		model
			.findTripById(tripId)
			.then(function (trip) {
				res.json(trip);
			});
	}

	function addDayToTrip(req, res) {
		var tripId = req.params.tripId;

		console.log(tripId);

		model
			.addDayToTrip(tripId)
			.then(function (trip) {
				res.json(trip);
			});
	}

	function findAllTripsForCity(req, res) {
		var city = req.params.city;

		model
			.findAllTripsForCity(city)
			.then(function (trips) {
				res.json(trips);
			});
	}

	function findTripsForUser(req, res) {
		var userId = req.params.userId;

		model
			.findTripsForUser(userId)
			.then(function (trips) {
				res.json(trips);
			});
	}

	function deletePlace(req, res) {
		var tripId = req.params.tripId;
		var dayIndex = req.params.dayIndex;
		var placeIndex = req.params.placeIndex;

		model
			.deletePlace(tripId, dayIndex, placeIndex)
			.then(function (trip) {
				res.json(trip);
			});
	}

	function deleteDay(req, res) {
		var tripId = req.params.tripId;
		var dayIndex = req.params.dayIndex;

		model
			.deleteDay(tripId, dayIndex)
			.then(function (trip) {
				res.json(trip);
			});
	}

	function deleteTrip(req, res) {
		var tripId = req.params.tripId;

		model
			.deleteTrip(tripId)
			.then(function (trip) {
				res.json(trip);
			});
	}


	function addCollaborator(req, res) {
		var username = req.body.username;
		var tripId = req.params.tripId;

		model
			.addCollaborator(tripId, username)
			.then(function (trip) {
				res.json(trip);
			});
	}

	function deleteCollaborator(req, res) {
		var index = req.params.index;
		var tripId = req.params.tripId;

		model
			.deleteCollaborator(tripId, index)
			.then(function (trip) {
				res.json(trip);
			});
	}
}