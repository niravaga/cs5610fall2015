"use strict";

(function () {
	angular
		.module("TripPlannerApp")
		.factory("UserService", UserService);

	function UserService($http, $q) {

		var api = {
			createUser: createUser,
			findAllUsers: findAllUsers,
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findUserByUsername: findUserByUsername,
			findUserById: findUserById,
			findUserList: findUserList,
			deleteUserById: deleteUserById,
			updateUser: updateUser,
			login: login,
			logout: logout
		};

		return api;

		function createUser(newUser) {
			var deferred = $q.defer();

			$http
				.post("/api/project/user", newUser)
				.then(function (user) {
					deferred.resolve(user);
				});

			return deferred.promise;
		}

		function findAllUsers() {
			var deferred = $q.defer();

			$http
				.get("/api/project/user")
				.then(function (users) {
					deferred.resolve(users.data);
				});

			return deferred.promise;
		}

		function findUserByUsernameAndPassword(username, password) {
			var deferred = $q.defer();

			$http
				.get("/api/project/user?username=" + username + "&password=" + password)
				.then(function (user) {
					deferred.resolve(user);
				});

			return deferred.promise;
		}

		function findUserById(userId) {
			var deferred = $q.defer();

			$http
				.get("/api/project/user/" + userId)
				.success(function (user) {
					deferred.resolve(user);
				});

			return deferred.promise;
		}

		function deleteUserById(id) {
			var deferred = $q.defer();
			$http
				.delete("/api/project/user/" + id)
				.then(function (users) {
					deferred.resolve(users.data);
				});

			return deferred.promise;
		}

		function updateUser(id, user) {
			var deferred = $q.defer();

			$http
				.put("/api/project/user/" + id, user)
				.then(function (updatedUser) {
					deferred.resolve(updatedUser);
				});

			return deferred.promise;
		}

		function login(user) {
			var deferred = $q.defer();

			$http
				.post("/api/project/login", user)
				.then(function (response) {
					deferred.resolve(response.data);
				}, function (err) {
					deferred.resolve(null);
				});

			return deferred.promise;
		}

		function logout(user) {
			var deferred = $q.defer();

			$http
				.post("/api/project/logout")
				.then(function (response) {
					deferred.resolve(response);
				});

			return deferred.promise;
		}

		function findUserByUsername(username) {
			var deferred = $q.defer();

			$http
				.get("/api/project/user?username=" + username)
				.success(function (user) {
					deferred.resolve(user);
				});

			return deferred.promise;
		}

		function findUserList(userIds) {
			var promises = [];

			for (var i in userIds) {
				console.log(userIds[i]);
				promises.push(findUserById(userIds[i]));
			}

			return $q.all(promises);
		}
	}
})();
