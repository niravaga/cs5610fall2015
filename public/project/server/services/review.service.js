module.exports = function (app, model) {
	app.post("/api/project/trip/:tripId/author/:userId", createCommentForUser);
	app.get("/api/project/trip/:tripId/review", findTripReviews);

	function createCommentForUser(req, res) {
		var tripId = req.params.tripId;
		var userId = req.params.userId;
		var comment = req.body;

		model
			.createCommentForUser(userId, tripId, comment)
			.then(function (review) {
				res.json(review);
			});
	}

	function findTripReviews(req, res) {
		var tripId = req.params.tripId;

		model
			.findTripReviews(tripId)
			.then(function (reviews) {
				res.json(reviews);
			});
	}
}