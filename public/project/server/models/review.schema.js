module.exports = function (mongoose) {
	var ReviewSchema = mongoose.Schema({
		"authorId": String,
		"tripId": String,
		"rating": Number,
		"comment": String
	}, { collection: "cs5610.project.review" });

	return ReviewSchema;
}