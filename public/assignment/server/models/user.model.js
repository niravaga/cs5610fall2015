var users = require("./user.mock.json");
var uuid = require("node-uuid");
var q = require("q");

module.exports = function (mongoose, db) {

	var UserSchema = mongoose.Schema({
		"firstName": String,
		"lastName": String,
		"username": String,
		"password": String,
		"email": String,
		"created": { type: Date, default: Date.now },
	}, { collection: "cs5610.assignment/user" });

	var UserModel = mongoose.model("UserModel", UserSchema);

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

		UserModel.create(newUser, function (err, doc) {
			UserModel.find(function (err, users) {
				deferred.resolve(users);
			});
		});

		return deferred.promise;
	}

	function findAllUsers() {
		var deferred = q.defer();

		UserModel.find(function (err, users) {
			deferred.resolve(users);
		});

		return deferred.promise;
	}

	function findUserById(id) {
		var deferred = q.defer();

		UserModel.findById(id, function (err, user) {
			deferred.resolve(user);
		});

		return deferred.promise;
	}

	function updateUser(id, updatedUser) {
		var deferred = q.defer();

		UserModel.findById(id, function (err, user) {
			user.firstName = updatedUser.firstName;
			user.lastName = updatedUser.lastName;
			user.username = updatedUser.username;
			user.password = updatedUser.password;
			user.email = updatedUser.email;

			user.save(function (err, newUser) {
				deferred.resolve(newUser);
			});
		});

		return deferred.promise;
	}

	function deleteUser(id) {
		var deferred = q.defer();

		UserModel.remove({ '_id': id }, function (err, result) {
			UserModel.find(function (err, users) {
				deferred.resolve(users);
			});
		});

		return deferred.promise;
	}

	function findUserByUsername(username) {
		var deferred = q.defer();

		UserModel.findOne({ 'username': username }, function (err, user) {
			deferred.resolve(user);
		});

		return deferred.promise;
	}

	function findUserByCredentials(credentials) {
		var deferred = q.defer();

		UserModel.findOne({
			'username': credentials.username,
			'password': credentials.password
		}, function (err, user) {
			console.log(user);
			deferred.resolve(user);
		});

		return deferred.promise;
	}
};
