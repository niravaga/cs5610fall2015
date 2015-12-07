module.exports = function (app, model, passport) {
	app.get("/api/project/loggedin", loggedIn);
	app.post("/api/project/login", passport.authenticate('local'), login);
	app.post("/api/project/logout", logout);
	app.post("/api/project/user", createUser);
	app.get("/api/project/user", findUsers);
	app.get("/api/project/user/:id", findUserById);
	app.put("/api/project/user/:id", updateUser);
	app.delete("/api/project/user/:id", deleteUser);

	function login(req, res) {
		var user = req.body;

		model
			.findUserByCredentials(user)
			.then(function (foundUser) {
				res.json(foundUser);
			});
	}

	function logout(req, res) {
		req.logout();
		res.send(200);
	}

	function loggedIn(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	}


	function createUser(req, res) {
		var newUser = req.body;
		model
			.createUser(newUser)
			.then(function (users) {
				res.json(users);
			});
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

				model
					.findUserByCredentials(credentials)
					.then(function (user) {
						res.json(user);
					});
			}
			else {
				model
					.findUserByUsername(username)
					.then(function (user) {
						res.json(user);
					});
			}
		}
		else {
			model
				.findAllUsers()
				.then(function (users) {
					res.json(users);
				});
		}
	}

	function findUserById(req, res) {
		var id = req.params.id;
		model
			.findUserById(id)
			.then(function (user) {
				res.json(user);
			});
	}

	function updateUser(req, res) {
		var id = req.params.id;
		var updatedUser = req.body;
		model
			.updateUser(id, updatedUser)
			.then(function (user) {
				res.json(user);
			});
	}

	function deleteUser(req, res) {
		var id = req.params.id;
		model
			.deleteUser(id)
			.then(function (users) {
				res.json(users);
			});
	}


};
