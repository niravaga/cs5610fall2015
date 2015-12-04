module.exports = function (app, model) {
	app.post("/api/project/trip", createTrip);
	app.get("/api/project/trip/:tripId", findTripById);
	app.post("/api/project/trip/:tripId/day", addDayToTrip);
	app.get("/api/project/trip/city/:city", findAllTripsForCity);

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
}