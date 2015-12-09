var https = require('https');
var key = "AIzaSyAMShhBML8rlCNJ6DlnsU8wF84rfiWMISw";

module.exports = function (app, model) {
	app.post("/api/project/trip/:tripId/day/:dayIndex/place", addPlace);
	app.get("/api/project/place/:name", getPlace);
	app.get("/api/project/place/:name/details", getPlaceDetails);

	function getPlace(req, res) {
		var location = req.params.name;

		var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + key;

		console.log(url);

		https.get(url, function (response) {
			var body = '';
			response.on('data', function (chunk) {
				body += chunk;
			});

			response.on('end', function () {
				var places = JSON.parse(body);
				var locations = places.results;

				res.json(locations);
			});
		}).on('error', function (err) {
			console.log("Error: " + err.message);
		});
	}

	function getPlaceDetails(req, res) {

		var location = req.params.name;

		var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + location + "&key=" + key;

		console.log(url);

		https.get(url, function (response) {
			var body = '';
			response.on('data', function (chunk) {
				body += chunk;
			});

			response.on('end', function () {
				var place = JSON.parse(body);
				var location = place.result;
				
				console.log(location);
				
				if (location.photos) {
					console.log("Finding photos");
					addPhotoUrl(location.photos[0].photo_reference, location);
				}
				
				res.json(location);
			});
		}).on('error', function (err) {
			console.log("Error: " + err.message);
		});
	}

	function addPhotoUrl(photoRef, place) {
		var browserKey = "AIzaSyBbtkDxjuDPKJJev18t5TEnAGn0t9h-YrQ";
		var url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxHeight=200&photoreference=" + photoRef + "&key=" + browserKey;
		
		place.photoUrl = url;
	}

	function addPlace(req, res) {
		var tripId = req.params.tripId;
		var dayIndex = req.params.dayIndex;
		var place = req.body;

		model
			.addPlace(tripId, dayIndex, place)
			.then(function (trip) {
				res.json(trip);
			});
	}
}