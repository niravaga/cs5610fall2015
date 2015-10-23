(function () {
	
	angular
	.module("FormBuilderApp")
	.controller("LoginController", LoginController);

	function LoginController($scope, $location, UserService) {
		
		$scope.username = "";
		$scope.password = "";
		
		$scope.login = function() {
			console.log($scope.username);
			// body...
		}
	}
	
}) ();
