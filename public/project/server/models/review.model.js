var q = require("q");

module.exports = function (mongoose, db) {

	var ReviewSchema = require("./review.schema.js")(mongoose);
	var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

	var api = {
		createCommentForUser: createCommentForUser,
		findTripReviews: findTripReviews
	};

	return api;

	function createCommentForUser(userId, tripId, comment) {
		comment.userId = userId;
		comment.tripId = tripId;

		console.log(comment);
		return createComment(comment);
	}

	function createComment(comment) {
		var deferred = q.defer();

		ReviewModel.create(comment, function (err, doc) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(doc);
		});

		return deferred.promise;
	}

	function findTripReviews(tripId) {
		var deferred = q.defer();

		ReviewModel.find({ tripId: tripId }, function (err, reviews) {
			if (err)
				deferred.reject(err);
			else
				deferred.resolve(reviews);
		});

		return deferred.promise;
	}
}