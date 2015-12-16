"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.controller("tripSearchController", tripSearchController);

	function tripSearchController($routeParams, TripService, UserService, ReviewService) {
		var model = this;
		var city = $routeParams.city;
		model.city = city;

		function init() {
			TripService
				.findAllTripsForCity(city)
				.then(function (trips) {
					model.trips = trips;
					console.log(trips);
					findTripUsers(trips);
					findAverageRatings(trips);
				});

			function findTripUsers(trips) {
				var userIds = [];

				for (var i in trips) {
					userIds.push(trips[i].userId);
				}
				
				for (var i in trips) {
					UserService
						.findUserList(userIds)
						.then(function (users) {
							for (var i in trips) {
								console.log(trips[i]);
								trips[i].user = users[i];
							}
						});
				}
			}

			function findAverageRatings(trips) {
				
				var tripIds = [];
				
				for (var i in trips) {
					tripIds.push(trips[i]._id);
				}
				
				for (var i in trips) {
					ReviewService
						.findTripListReviews(tripIds)
						.then(function (reviews) {
							for (var i in trips) {
								trips[i].averageRating = findAverageRating(reviews[i]);
							}
						});
				}
			}

			function findAverageRating(reviews) {

				if (reviews.length == 0)
					return 0;

				var sum = 0;
				for (var i in reviews) {
					console.log(reviews[i])
					sum += reviews[i].rating;
				}

				return sum / reviews.length;
			}
		}

		init();
	}
})();