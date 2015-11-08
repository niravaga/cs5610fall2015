(function () {
	angular
	.module("TripPlannerApp")
	.controller("tripCreateController", tripCreateController);

	function tripCreateController ($scope, uiGmapGoogleMapApi) {

		var pos = {latitude: 47.6094497, longitude: -122.3418};
		
		uiGmapGoogleMapApi.then(showMap);

		function showMap (maps) {
			$scope.map = { center: pos, zoom: 8 };
		}

		var marker1 = {
			latitude: 47.6094497,
			longitude: -122.3418,
			title: "Pike Place Market",
			id: 1
		};

		var marker2 = {
			latitude: 47.6205063,
			longitude: -122.3492774,
			title: "Space Needle",
			id: 2
		};

		$scope.markers = [marker1, marker2];


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

}) ();