(function () {
	angular
		.module("TripPlannerApp")
		.controller("tripCreateController", tripCreateController);

	function tripCreateController($routeParams, uiGmapGoogleMapApi, TripService, PlaceService) {

		var model = this;
		model.addPlace = addPlace;
		model.addDay = addDay;
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
					dayIndex++;
					refreshTrip();
				});
		}

		function addPlace(placeName) {

			var currPlace = { name: placeName, placeId: " " };

			addPlaceMarker(placeName);

			PlaceService
				.addPlace(model.trip._id, dayIndex, currPlace)
				.then(function (trip) {
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
		
		// var marker1 = {
		// 	latitude: 47.6094497,
		// 	longitude: -122.3418,
		// 	title: "Pike Place Market",
		// 	id: 1
		// };

		// var marker2 = {
		// 	latitude: 47.6205063,
		// 	longitude: -122.3492774,
		// 	title: "Space Needle",
		// 	id: 2
		// };

		// $scope.markers = [marker1, marker2];


		// var pos2 = {lat: 47.6205063, lng: -122.3492774};
		
		// var map = new google.maps.Map(document.getElementById('map'), {
		// 	center: pos,
		// 	zoom: 8
		// });

		// var marker = new google.maps.Marker({
		// 	position: pos,
		// 	map: map,
		// 	title: "Pike Place Market"
		// });

		// var marker2 = new google.maps.Marker({
		// 	position: pos2,
		// 	map: map,
		// 	title: "Space Needle"
		// });
	}

})();