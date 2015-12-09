(function () {
	angular
		.module("TripPlannerApp")
		.controller("AdminController", AdminController);
		
	function AdminController(UserService, TripService) {
		var model = this;
		model.deleteUser = deleteUser;
		
		function init() {
			UserService
				.findAllUsers()
				.then(function (users) {
					model.allUsers = users;
				});
		}
		
		init();
		
		function deleteUser(userId) {
			UserService
				.deleteUserById(userId)
				.then(function (users) {
					model.allUsers = users;
				});
		}
	}
})();