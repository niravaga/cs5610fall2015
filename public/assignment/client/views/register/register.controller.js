(function () {

	angular
	.module("FormBuilderApp")
	.controller("RegisterController", RegisterController);

	function RegisterController ($rootScope, $location, UserService) {
		
		var model = this;

		model.register = register;


		function register () {
			UserService
			.createUser(model.newUser)
			.then(userCreated);
		}

		function userCreated (users) {
			UserService
			.findUserByUsernameAndPassword(model.newUser.username, model.newUser.password)
			.then(function(user) {
				// console.log(user);
				$rootScope.loggedInUser = user;	
				$location.url("/profile");
			});
			
			
		}
	}
}) ();