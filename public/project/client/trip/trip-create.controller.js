(function () {
	angular
	.module("TripPlannerApp")
	.controller("tripCreateController", tripCreateController);

	function tripCreateController ($scope) {

		var pos = {lat: 47.6094497, lng: -122.3418};
		var pos2 = {lat: 47.6205063, lng: -122.3492774};
		
		var map = new google.maps.Map(document.getElementById('map'), {
			center: pos,
			zoom: 8
		});

		var marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: "Pike Place Market"
		});

		var marker2 = new google.maps.Marker({
			position: pos2,
			map: map,
			title: "Space Needle"
		});
	}

}) ();