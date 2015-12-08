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
				controller: "RegisterController as model"
			})
			.when("/login", {
				templateUrl: "login/login.view.html",
				controller: "loginController as model"
			})
			.when("/profile", {
				templateUrl: "profile/profile.view.html",
				controller: "profileController as model",
				resolve: {
					loggedIn: checkLoggedin
				}
			})
			.when("/trip-create/:tripId", {
				templateUrl: "trip/trip-create.view.html",
				controller: "tripCreateController as model"
			})
			.when("/trip-search/:city", {
				templateUrl: "trip/trip-search.view.html",
				controller: "tripSearchController as model"
			})
			.when("/trip/:tripId/collaborate", {
				templateUrl: "collaborate/collaborate.view.html",
				controller: "CollabController as model"
			})
			.otherwise({
				redirectTo: "/home"
			});
	}
})();

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
	var deferred = $q.defer();

	$http.get('/api/project/loggedin')
		.success(function (user) {
			if (user !== '0') {
				$rootScope.currentUser = user;
				deferred.resolve();
			}
			else {
				$rootScope.errorMessage = 'Please login to access this feature.';
				deferred.reject();
				$location.url('/login');
			}
		});

	return deferred.promise;
};