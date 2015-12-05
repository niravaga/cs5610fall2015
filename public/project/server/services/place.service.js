module.exports = function (app, model) {
	app.post("/api/project/trip/:tripId/day/:dayIndex/place", addPlace);

	function addPlace(req, res) {
		var tripId = req.params.tripId;
		var dayIndex = req.params.dayIndex;
		var place = req.body;
		
		model
			.addPlace(tripId, dayIndex, place)
			.then(function (trip) {
				res.json(trip);
			});

	}
}