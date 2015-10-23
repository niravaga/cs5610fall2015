(function () {
	"use strict";
	angular
	.module("FormBuilderApp")
	.factory("UserService", UserService);

	function UserService() {
		
		var user1 = {
			id: 10,
			userName: "Nirav",
			password: "123",
			email: "e@mail.com"
		};

		var users = [user1];

		var service = {
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};

		function findUserByUsernameAndPassword(findUserName, findPassword, callback) {
			for (var i in users) {
				if((users[i].userName == findUserName) && (users[i].password == findPassword)) {
					console.log(users[i]);
					callback(user);
					return;
				}
			}
		}

		function findAllUsers(callback) {
			callback(users);
		}

		function createUser(newUser, callback) {
			newUser[id] = guid();

			users.push(newUser);
			callback(newUser);
		}

		function deleteUserById(userId, callback) {
			for(var i in users) {
				if (users[i].id = userId) {
					users.splice(i,1);
				}
			}

			callback(users);
		}

		function updateUser(userId, newUser, callback) {
			for(var i in users) {
				if(users[i].id == userId) {
					users.splice(i,1);
					newUser[id] = userId;
					users.push(newUser);
				}
			}

			callback(newUser);
		}


		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}

			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		}

		return service;
	}
})();