module.exports = function (app, db) {

	var api = {
		createUser: createUser,
		findAllUsers: findAllUsers,
		findUserById: findUserById,
		updateUser: updateUser,
		deleteUser: deleteUser,
		findUserByUserName: findUserByUserName,
		findUserByCredentials: findUserByCredentials
	};

	return api;

	function createUser(user) {

	}

	function findAllUsers () {
		
	}

	function findUserById(id) {

	}

	function updateUser (id, user) {
		
	}

	function deleteUser(user) {

	}

	function findUserByUserName (username) {
		
	}

	function findUserByCredentials (credentails) {
		
	}
};