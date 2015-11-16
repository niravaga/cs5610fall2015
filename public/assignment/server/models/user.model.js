var users = require("./user.mock.json");
var uuid = require("node-uuid");

module.exports = function (app) {

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
		var user = newUser;
		user.id = uuid.v1();

		// console.log(user);
		users.push(newUser);

		return users;
	}

	function findAllUsers() {
		return users;
	}

	function findUserById(id) {
		for(var i in users) {
			if(users[i].id == id)
				return users[i];
		}
	}

	function updateUser(id, user) {
		for(var i in users) {
			if(users[i].id == id) {
				users[i] = user;
				break;
			}
		}

		return user;
	}

	function deleteUser(id) {
		for(var i in users) {
			if (users[i].id == user.id) {
				users.splice(i, 1);
				break;
			}
		}

		return users;
	}

	function findUserByUsername(username) {
		for(var i in users) {
			if(users[i].username == username)
				return users[i];
		}
	}

	function findUserByCredentials (credentials) {
		for(var i in users) {
			if(users[i].username == credentials.username &&
				users[i].password == credentials.password)
				return users[i];
		}
	}
};
