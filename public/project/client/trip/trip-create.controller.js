(function () {
	angular
		.module("TripPlannerApp")
		.controller("tripCreateController", tripCreateController);

	function tripCreateController($rootScope, $routeParams, uiGmapGoogleMapApi, TripService, PlaceService, ReviewService) {

		var model = this;
		model.addPlace = addPlace;
		model.addDay = addDay;
		model.addReview = addReview;
		model.alert = popup;
		model.setDayIndex = setDayIndex;
		model.deleteDay = deleteDay;
		model.deletePlace = deletePlace;
		model.markers = [];

		var tripId = $routeParams.tripId;
		var dayIndex = 0;
		var markerId = 1;
		function init() {
			TripService
				.findTripById(tripId)
				.then(function (trip) {
					console.log(trip);
					model.trip = trip;
					initMap(trip);
				});

			function initMap(trip) {
				PlaceService
					.findPlace(trip.city)
					.then(function (place) {
						var location = place.data.results[0].geometry.location;

						var center = {
							latitude: location.lat,
							longitude: location.lng
						};

						uiGmapGoogleMapApi.then(showMap);

						function showMap(maps) {
							console.log(center);
							model.map = { center: center, zoom: 8 };
						}

						addTripMarkers(trip);
					});
			}
		}

		init();

		function addTripMarkers(trip) {
			model.markers = [];
			markerId = 1;
			for (var i in trip.days) {
				var currPlaces = trip.days[i].places;
				for (var j in currPlaces) {
					addPlaceMarker(currPlaces[j].name);
				}
			}
		}

		function refreshTrip() {
			TripService
				.findTripById(tripId)
				.then(function (trip) {
					model.trip = trip;
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

			var currPlace = { name: newPlace.name, placeId: newPlace.place_id };

			addPlaceMarker(newPlace.formatted_address);

			PlaceService
				.addPlace(model.trip._id, dayIndex, currPlace)
				.then(function (trip) {
					model.newPlace = null;
					refreshTrip();
				});
		}

		function addPlaceMarker(placeName) {
			PlaceService
				.findPlace(placeName)
				.then(function (place) {
					addMarker(place);
				});
		}

		function addMarker(place) {
			if (!place.data.results[0])
				return;

			var location = place.data.results[0].geometry.location;

			var marker = {
				latitude: location.lat,
				longitude: location.lng,
				id: markerId,
				title: "Test"
			};

			markerId++;
			console.log(place);
			model.markers.push(marker);
		}

		function addReview() {
			console.log(model.review)
			ReviewService
				.addReview($rootScope.currentUser._id, tripId, model.review)
				.then(function (review) {
					updateReviews();
				});
		}

		function updateReviews() {
			console.log(model.review);
			model.review = null;
		}

		function popup(message) {
			console.log(message);
		}

		function setDayIndex(index) {
			dayIndex = index;
		}

		function deletePlace(dayIndex, placeIndex) {
			TripService
				.deletePlace(tripId, dayIndex, placeIndex)
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
	}

})();