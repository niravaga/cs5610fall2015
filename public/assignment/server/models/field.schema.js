module.exports = function (mongoose) {
	var FieldSchema = mongoose.Schema({
		"label": String,
		"type": {
			type: String,
			enum: ["TEXT", "TEXTAREA", "OPTIONS", "CHECKBOXES", "RADIOS", "DATE"]
		},
		"placeholder": String,
		"options": [{
			"label": String,
			"value": String
		}]
	});
	
	return FieldSchema;
};