module.exports = function (app, db) {
	app.post("/api/assignment/user", addUser);
	app.get("/api/assignment/user", findAllUsers);
	app.get("/api/assignment/user/:id", findUserById);
	app.get("api/assignment/user?username=:username", findUserByUsername);
	app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
	app.put("/api/assignment/user/:id", updateUser);
	app.delete("/api/assignment/user/:id", deleteUser);

	function addUser(req, res) {
	
	}
	
	function findAllUsers(req, res) {
		
	}
	
	function findUserById(req, res) {
		
	}
	
	function findUserByUsername(req, res) {
		
	}
	
	function findUserByCredentials(req, res) {
		
	}
	
	function updateUser(req, res) {
		
	}
	
	function deleteUser(req, res) {
		
	}
};

