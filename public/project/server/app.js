module.exports = function (app, mongoose, db) {
	var userModel = require("./models/user.model.js")(mongoose, db);
	var tripModel = require("./models/trip.model.js")(mongoose, db);
	var reviewModel = require("./models/review.model.js")(mongoose, db);

	require("./services/user.service.js")(app, userModel);
	require("./services/trip.service.js")(app, tripModel);
	require("./services/place.service.js")(app, tripModel);
	require("./services/review.service.js")(app, reviewModel);
};