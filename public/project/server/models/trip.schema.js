module.exports = function (mongoose) {
	var TripSchema = mongoose.Schema({
		"city": String,
		"days": [
		{
			"places": [{
				"name": String,
				"placeId": String
			}
			]
		}
		]
	}, {collection: "cs5610.project.trip"});

	return TripSchema;
};