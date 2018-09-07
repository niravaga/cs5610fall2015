"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.controller("tripCreateController", tripCreateController);

	function tripCreateController($rootScope, $routeParams, $location, uiGmapGoogleMapApi, TripService, PlaceService, ReviewService, UserService) {

		var model = this;
		model.addPlace = addPlace;
		model.addDay = addDay;
		model.addReview = addReview;
		model.alert = popup;
		model.setDayIndex = setDayIndex;
		model.deleteDay = deleteDay;
		model.deletePlace = deletePlace;
		model.createTrip = createTrip;
		model.updateTrip = updateTrip;
		model.markers = [];
		model.reviews = [];

		model.sortableOptions = {
			connectWith: ".apps-container"
		}

		var tripId = $routeParams.tripId;
		model.isOwner = false;
		model.isCollaborator = false;
		var dayIndex = 0;
		var markerId = 1;

		function init() {
			TripService
				.findTripById(tripId)
				.then(function (trip) {
					console.log(trip);
					model.trip = trip;
					initMap(trip);
					initReviews();
					authenticateUser(trip);
				});

			function initMap(trip) {
				PlaceService
					.findPlace(trip.city)
					.then(function (place) {
						var location = place.geometry.location;

						var center = {
							latitude: location.lat,
							longitude: location.lng
						};

						uiGmapGoogleMapApi.then(showMap);

						function showMap(maps) {
							model.map = { center: center, zoom: 8 };
						}

						addTripMarkers(trip);
					});
			}

			function authenticateUser(trip) {
				if ($rootScope.currentUser) {
					if ($rootScope.currentUser._id == trip.userId)
						model.isOwner = true;

					if (trip.collaborators.indexOf($rootScope.currentUser.username) != -1)
						model.isCollaborator = true;
				}
			}


		}

		init();

		function initReviews() {
			ReviewService
				.findTripReviews(tripId)
				.then(function (reviews) {
					console.log(reviews);
					findReviewUsers(reviews);
					model.reviews = reviews;
				});
		}

		function findReviewUsers(reviews) {

			var userIds = [];

			for (var i in reviews) {
				userIds.push(reviews[i].userId);
			}

			UserService
				.findUserList(userIds)
				.then(function (users) {
					for (var i in reviews) {
						console.log(reviews[i]);
						reviews[i].user = users[i];
					}
				});
		}

		function addTripMarkers(trip) {
			model.markers = [];
			markerId = 1;
			for (var i in trip.days) {
				var currPlaces = trip.days[i].places;

				// PlaceService
				// 	.findPlaceListDetails(currPlaces.map(function (ob) { return ob.placeId }))
				// 	.then(function (newPlaces) {
				// 		for (var i in currPlaces) {
				// 			currPlaces[i] = newPlaces[i];
				// 		}
				// 		console.log("placeDetails");
				// 	});

				for (var j in currPlaces) {
					addPlaceMarker(currPlaces[j]);
				}
			}
		}

		function refreshTrip() {
			TripService
				.findTripById(tripId)
				.then(function (trip) {
					model.trip = trip;
					console.log("CurrentTrip: ", trip);
				});
		}

		function addDay() {
			TripService
				.addDayToTrip(model.trip._id)
				.then(function (trip) {
					dayIndex = trip.days.length - 1;
					refreshTrip();
				});
		}

		function addPlace(newPlace) {

			console.log(newPlace.geometry.location.lat());

			var currPlace = {
				name: newPlace.name,
				placeId: newPlace.place_id,
				latitude: newPlace.geometry.location.lat(),
				longitude: newPlace.geometry.location.lng()
			};

			addPlaceMarker(currPlace);

			PlaceService
				.addPlace(model.trip._id, dayIndex, currPlace)
				.then(function (trip) {
					model.newPlace = null;
					refreshTrip();
				});
		}

		function addPlaceMarker(place) {
			var marker = {
				latitude: place.latitude,
				longitude: place.longitude,
				id: markerId,
				title: place.name
			};

			markerId++;
			console.log(marker);
			model.markers.push(marker);
		}

		function addReview() {
			console.log(model.review)
			ReviewService
				.addReview($rootScope.currentUser._id, tripId, model.review)
				.then(function (review) {
					initReviews();
				});
		}

		function popup(message) {
			console.log(message);
		}

		function setDayIndex(index) {
			dayIndex = index;
		}

		function deletePlace(day, placeIndex) {
			PlaceService
				.deletePlace(tripId, day, placeIndex)
				.then(function (trip) {
					model.trip = trip;
					addTripMarkers(trip);
				});
		}

		function deleteDay(dayIndex) {
			TripService
				.deleteDay(tripId, dayIndex)
				.then(function (trip) {
					model.trip = trip;
					addTripMarkers(trip);
					dayIndex = trip.days.length - 1;
				});
		}

		function createTrip() {

			if ($rootScope.currentUser) {
				console.log("Creating trip for city " + model.trip.city);

				var newTrip = {
					city: model.trip.city,
					userId: $rootScope.currentUser._id,
					days: model.trip.days
				};

				TripService
					.createTrip(newTrip)
					.then(function (trip) {
						// console.log(trip._id);
						$location.url("/trip-create/" + trip._id);
					});
			}
			else {
				$rootScope.errorMessage = "Please login to create trips";
				$location.url("/login");
			}
		}

		function updateTrip() {
			TripService
				.updateTrip(tripId, model.trip)
				.then(function (response) {
					refreshTrip();
				});
		}


	}



})();