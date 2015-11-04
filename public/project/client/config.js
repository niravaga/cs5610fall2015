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
		.when("/trip-create", {
			templateUrl: "trip/trip-create.view.html",
			controller: "tripCreateController"
		})
		.otherwise({
			redirectTo: "/home"
		});
	}
}) ();