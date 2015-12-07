(function () {
	angular
		.module("TripPlannerApp")
		.factory("ReviewService", ReviewService);

	function ReviewService($http, $q) {
		var api = {
			addReview: addReview
		}

		return api;

		function addReview(userId, tripId, comment) {
			var deferred = $q.defer();

			$http
				.post("/api/project/trip/" + tripId + "/author/" + userId, comment)
				.then(function (review) {
					deferred.resolve(review.data);
				});

			return deferred.promise;
		}

		function getTripReviews(tripId) {
			var deferred = $q.defer();

			$http
				.get("/api/project/trip/" + tripId + "/tripId")
				.then(function (reviews) {
					deferred.resolve(reviews.data);
				});

			return deferred.promise;
		}
	}
})();