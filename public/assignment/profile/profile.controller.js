(function () {
	angular
	.module("FormBuilderApp")
	.controller("ProfileController", ProfileController)

	function ProfileController ($scope, $rootScope, UserService) {
		
		console.log($rootScope.$loggedInUser);
		$scope.$loggedInUser = $rootScope.$loggedInUser;

		$scope.update = function () {
			var userId = $scope.$loggedInUser.id;
			var newUser = $scope.$loggedInUser;

			UserService.updateUser(userId, newUser, updatedUser);
		}

		function updatedUser (user) {
			console.log(user);
		}
	}
}) ();