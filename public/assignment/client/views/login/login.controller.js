(function () {
	
	angular
	.module("FormBuilderApp")
	.controller("LoginController", LoginController);

	function LoginController($location, $rootScope, UserService) {
		
		
		var model = this;
		model.login = login;

		function login() {

			// console.log("Logging in " + model.username);

			var username = model.username;
			var password = model.password;
			// console.log($scope.username);
			UserService
			.findUserByUsernameAndPassword(username, password)
			.then(foundUser);
		}

		function foundUser (user) {
			$rootScope.loggedInUser = user;
			// console.log(user);
			$location.url("/profile");
		}
	}
	
}) ();
