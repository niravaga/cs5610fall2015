(function () {
	angular
		.module("TripPlannerApp")
		.config(Configure);

	function Configure($routeProvider) {
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
			.when("/trip-create/:tripId", {
				templateUrl: "trip/trip-create.view.html",
				controller: "tripCreateController as model"
			})
			.when("/trip-search/:city", {
				templateUrl: "trip/trip-search.view.html",
				controller: "tripSearchController as model"
			})
			.otherwise({
				redirectTo: "/home"
			});
	}
})();