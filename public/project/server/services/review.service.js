module.exports = function (app, model) {
	app.post("/api/project/trip/:tripId/author/:userId", createCommentForUser);

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
}