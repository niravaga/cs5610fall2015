(function () {
	
	angular
	.module("FormBuilderApp")
	.controller("LoginController", LoginController);

	function LoginController($scope, $location, $rootScope, UserService) {
		
		$scope.username = "";
		$scope.password = "";
		
		$scope.login = function() {

			username = $scope.username;
			password = $scope.password;
			// console.log($scope.username);
			UserService.findUserByUsernameAndPassword(username, password, foundUser);
		}

		function foundUser (user) {
			$rootScope.$loggedInUser = user;
			$location.url("/profile");
		}
	}
	
}) ();
