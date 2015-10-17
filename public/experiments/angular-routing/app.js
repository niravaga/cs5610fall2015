(function() {
	angular
	.module("WhiteBoardApp", ["ngRoute"])
	.config(configure);

	function configure ($routeProvider) {
		$routeProvider
		.when("/home", {
			templateUrl: "home.html"
		})
		.when("/register" , {
			templateUrl: "register.html"
		})
		.when("/courses" , {
			templateUrl: "courses.html"
		})
		.when("/login" , {
			templateUrl: "login.html"
		})
		.otherwise({
			redirectTo: "/home"  
		});
	}
})();