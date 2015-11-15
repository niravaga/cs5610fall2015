module.exports = function (app, model) {
	app.get("/api/assignment/user/username=:username&password=:password", findUserByCredentials);
	app.get("/api/assignment/user/username=:username", findUserByUsername);
	app.post("/api/assignment/user", createUser);
	app.get("/api/assignment/user", findAllUsers);
	app.get("/api/assignment/user/:id", findUserById);
	app.put("/api/assignment/user/:id", updateUser);
	app.delete("/api/assignment/user/:id", deleteUser);

	function createUser(req, res) {
		var newUser = req.body;
		res.json(model.createUser(newUser));
	}

	function findAllUsers(req, res) {
		res.json(model.findAllUsers());
	}

	function findUserById(req, res) {
		var id = req.params.id;
		res.json(model.findUserById(id));
	}

	function findUserByUsername(req, res) {
		var username = req.params.username;
		console.log(username);
		res.json(model.findUserByUsername(username));
	}

	function findUserByCredentials(req, res) {
		var credentials = {
			username: req.params.username,
			password: req.params.password
		};

		// console.log(credentials);

		res.json(model.findUserByCredentials(credentials));
	}

	function updateUser(req, res) {
		var id = req.params.id;
		var updatedUser = req.body;
		res.json(model.updateUser(id, updatedUser));
	}

	function deleteUser(req, res) {
		var id = req.params.id;
		res.json(model.deleteUser(id));
	}
};
