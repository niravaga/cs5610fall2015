module.exports = function (app, model) {
	// app.get("/api/assignment/user", findUserByCredentials);
	// app.get("/api/assignment/user/username=:username", findUserByUsername);
	app.post("/api/assignment/user", createUser);
	app.get("/api/assignment/user", findUsers);
	app.get("/api/assignment/user/:id", findUserById);
	app.put("/api/assignment/user/:id", updateUser);
	app.delete("/api/assignment/user/:id", deleteUser);

	function createUser(req, res) {
		var newUser = req.body;
		res.json(model.createUser(newUser));
	}

	function findUsers(req, res) {
		var username = req.query.username;
		var password = req.query.password;

		if (typeof username != 'undefined') {
			if (typeof password != 'undefined') {
				var credentials = {
					username: username,
					password: password
				};

				res.json(model.findUserByCredentials(credentials));
			}
			else {
				res.json(model.findUserByUsername(username));
			}
		}
		else {
			res.json(model.findAllUsers());
		}
	}

	function findUserById(req, res) {
		var id = req.params.id;
		res.json(model.findUserById(id));
	}

	// function findUserByUsername(req, res) {
	// 	var username = req.params.username;
	// 	res.json(model.findUserByUsername(username));
	// }

	// function findUserByCredentials(req, res) {
	// 	var credentials = {
	// 		username: req.params.username,
	// 		password: req.params.password
	// 	};

	// 	res.json(model.findUserByCredentials(credentials));
	// }

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
