module.exports = function (app, mongoose, db, passport, LocalStrategy) {
	var userModel = require("./models/user.model.js")(mongoose, db, passport, LocalStrategy);
	var tripModel = require("./models/trip.model.js")(mongoose, db);
	var reviewModel = require("./models/review.model.js")(mongoose, db);

	require("./services/user.service.js")(app, userModel, passport);
	require("./services/trip.service.js")(app, tripModel);
	require("./services/place.service.js")(app, tripModel);
	require("./services/review.service.js")(app, reviewModel);
};