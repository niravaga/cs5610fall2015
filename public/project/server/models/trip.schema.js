module.exports = function (mongoose) {
	var TripSchema = mongoose.Schema({
		"userId": String,
		"city": String,
		"days": [
		{
			"places": [{
				"name": String,
				"placeId": String
			}
			]
		}
		],
		
		"collaborators": [String]
	}, {collection: "cs5610.project.trip"});

	return TripSchema;
};