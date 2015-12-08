var q = require("q");

module.exports = function (mongoose, db, passport, LocalStrategy) {

	var UserSchema = require("./user.schema.js")(mongoose);
	var UserModel = mongoose.model("TravellerModel", UserSchema);

	passport.use(new LocalStrategy(
		function (username, password, done) {
			UserModel.findOne({ username: username, password: password }, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				return done(null, user);
			})
		}));

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		UserModel.findById(user._id, function (err, user) {
			done(err, user);
		});
	});

	var api = {
		createUser: createUser,
		findAllUsers: findAllUsers,
		findUserById: findUserById,
		updateUser: updateUser,
		deleteUser: deleteUser,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials
	};

	return api;

	function createUser(newUser) {
		var deferred = q.defer();

		if (newUser["_id"])
			delete newUser["_id"];

		UserModel.create(newUser, function (err, doc) {
			UserModel.find(function (err, users) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(users);
				}
			});
		});

		return deferred.promise;
	}

	function findAllUsers() {
		var deferred = q.defer();

		UserModel.find(function (err, users) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(users);
			}
		});

		return deferred.promise;
	}

	function findUserById(id) {
		var deferred = q.defer();
		
		console.log(id);
		UserModel.findById(id, function (err, user) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(user);
			}
		});

		return deferred.promise;
	}

	function updateUser(id, updatedUser) {
		var deferred = q.defer();

		delete updatedUser["_id"];

		UserModel.update({ _id: id }, { $set: updatedUser },
			function (err, user) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(user);
				}
			});

		return deferred.promise;
	}

	function deleteUser(id) {
		var deferred = q.defer();

		UserModel.remove({ _id: id }, function (err, result) {
			UserModel.find(function (err, users) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(users);
				}
			});
		});

		return deferred.promise;
	}

	function findUserByUsername(username) {
		var deferred = q.defer();

		UserModel.findOne(
			{ 'username': username },
			function (err, user) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(user);
				}
			});

		return deferred.promise;
	}

	function findUserByCredentials(credentials) {
		var deferred = q.defer();

		UserModel.findOne({
			username: credentials.username,
			password: credentials.password
		}, function (err, user) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(user);
			}
		});

		return deferred.promise;
	}
};
