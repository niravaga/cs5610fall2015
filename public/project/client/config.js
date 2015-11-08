(function (){ 
	angular
	.module("TripPlannerApp")
	.config(Configure);

	function Configure ($routeProvider) {
		$routeProvider
		.when("/home", {
			templateUrl: "home/home.view.html",
			controller: "homeController"
		})
		.when("/register", {
			templateUrl: "register/register.view.html",
			controller: "registerController"
		})
		.when("/login", {
			templateUrl: "login/login.view.html",
			controller: "loginController"
		})
		.when("/profile", {
			templateUrl: "profile/profile.view.html",
			controller: "profileController"
		})
		.when("/trip-create", {
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