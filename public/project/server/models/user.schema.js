module.exports = function (mongoose) {
	var UserSchema = mongoose.Schema({
		"firstName": String,
		"lastName": String,
		"username": { type: String, unique: true },
		"password": String,
		"email": String,
		"role": {
			type: String,
			enum: ["ADMIN", "USER"],
			default: "USER"
		},
		"created": { type: Date, default: Date.now },
	}, { collection: "cs5610.project.user" });

	return UserSchema;
};