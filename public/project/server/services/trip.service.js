module.exports = function(app, model){
	app.post("/api/project/trip", createTrip);

	function createTrip(req, res) {
		var newTrip = req.body;

		model
		.createTrip(newTrip)
		.then(function(trip){
			res.json(trip);
		});
	}
}