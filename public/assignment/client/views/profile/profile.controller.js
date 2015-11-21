(function () {
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController)

	function ProfileController($rootScope, UserService) {

		var model = this;
		model.loggedInUser = $rootScope.loggedInUser;

		model.update = update;

		function update() {
			var updatedUser = model.loggedInUser;
			var id = updatedUser.id;

			UserService.updateUser(id, updatedUser)
				.then(function (response) {
					console.log(response);
				});
		}

	}
})();