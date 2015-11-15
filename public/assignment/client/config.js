(function () {
	angular
	.module("FormBuilderApp")
	.config(Configure);

	function Configure ($routeProvider) {
		$routeProvider
		.when("/home", {
			templateUrl: "views/home/home.view.html"
		})
		.when("/profile", {
			templateUrl: "views/profile/profile.view.html",
			controller: "ProfileController",
			controllerAs: "model"
		})
		.when("/admin", {
			templateUrl: "views/admin/admin.view.html",
			controller: "AdminController"
		})
		.when("/form", {
			templateUrl: "views/form/form.view.html"
		})
		.when("/register", {
			templateUrl: "views/register/register.view.html"
		})
		.when("/login", {
			templateUrl: "views/login/login.view.html",
			controller: "LoginController",
			controllerAs: "model"
		})
		.when("/form/feild", {
			templateUrl: "views/field/field.view.html",
			controller: "FieldController",
			controllerAs: "model"
		})
		.otherwise({
			redirectTo: "/home"
		});
	}
})();
