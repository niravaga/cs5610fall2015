"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.factory("ReviewService", ReviewService);

	function ReviewService($http, $q) {
		var api = {
			addReview: addReview,
			findTripReviews: findTripReviews,
			findTripListReviews: findTripListReviews
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

		function findTripListReviews(tripIds) {
			var promises = [];

			for (var i in tripIds) {
				// console.log(tripIds[i]);
				promises.push(findTripReviews(tripIds[i]));
			}

			return $q.all(promises);
		}
	}
})();