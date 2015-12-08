"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.factory("ReviewService", ReviewService);

	function ReviewService($http, $q) {
		var api = {
			addReview: addReview,
			findTripReviews: findTripReviews
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

		function findTripReviews(tripId) {
			var deferred = $q.defer();

			$http
				.get("/api/project/trip/" + tripId + "/review")
				.then(function (reviews) {
					deferred.resolve(reviews.data);
				});

			return deferred.promise;
		}
	}
})();