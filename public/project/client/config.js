(function (){ 
	angular
	.module("TripPlannerApp")
	.config(Configure);

	function Configure ($routeProvider) {
		$routeProvider
		.when("/home", {
			templateUrl: "home/home.view.html",
			controller: "HomeController as model"
		})
		.when("/register", {
			templateUrl: "register/register.view.html",
			controller: "registerController"
		})
		.when("/login", {
			templateUrl: "login/login.view.html",
			controller: "loginController as model"
		})
		.when("/profile", {
			templateUrl: "profile/profile.view.html",
			controller: "profileController as model"
		})
		.when("/trip-create/:id", {
			templateUrl: "trip/trip-create.view.html",
			controller: "tripCreateController"
		})
		.when("/trip-search", {
			templateUrl: "trip/trip-search.view.html",
			controller: "tripSearchController"
		})
		.otherwise({
			redirectTo: "/home"
		});
	}
}) ();