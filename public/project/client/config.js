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
		.otherwise({
			redirectTo: "/home"
		});
	}
}) ();