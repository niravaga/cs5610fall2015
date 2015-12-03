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
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};

		return api;

		function createUser(newUser) {
			var deferred = $q.defer();

			$http
			.post("/api/project/user", newUser)
			.success(function (user) {
				deferred.resolve(user);
			});

			return deferred.promise;
		}

		function findAllUsers() {
			var deferred = $q.defer();

			$http
			.get("/api/project/user")
			.success(function (users) {
				deferred.resolve(users);
			});

			return deferred.promise;
		}

		function findUserByUsernameAndPassword(username, password) {
			var deferred = $q.defer();

			$http
			.get("/api/project/user?username=" + username + "&password=" + password)
			.success(function (user) {
				deferred.resolve(user);
			});

			return deferred.promise;
		}

		function deleteUserById(id) {
			var deferred = $q.defer();
			$http
			.delete("/api/project/user/" + id)
			.success(function (users) {
				deferred.resolve(users);
			});

			return deferred.promise;
		}

		function updateUser(id, user) {
			var deferred = $q.defer();

			$http
			.put("/api/project/user/" + id, user)
			.success(function (updatedUser) {
				deferred.resolve(updatedUser);
			});

			return deferred.promise;
		}
	}
})();
