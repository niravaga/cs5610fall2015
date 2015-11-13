(function () {

	angular
	.module("FormBuilderApp")
	.controller("RegisterController", RegisterController);

	function RegisterController ($scope, $rootScope, $location, UserService) {
		
		var newUser;

		$scope.$newUser = newUser;
		
		$scope.register = function register () {
			UserService.createUser($scope.$newUser, userCreated);
		}

		function userCreated (user) {
			$rootScope.$loggedInUser = user;
			$location.url("/profile");
		}
	}
}) ();