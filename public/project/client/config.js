(function () {
	angular
		.module("TripPlannerApp")
		.config(Configure);

	function Configure($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "home/home.view.html",
				controller: "HomeController as model",
				resolve: {
					setUser: setCurrentUser
				}
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
				controller: "tripCreateController as model",
				resolve: {
					setUser: setCurrentUser
				}
			})
			.when("/trip-search/:city", {
				templateUrl: "trip/trip-search.view.html",
				controller: "tripSearchController as model",
				resolve: {
					setUser: setCurrentUser
				}
			})
			.when("/trip/:tripId/collaborate", {
				templateUrl: "collaborate/collaborate.view.html",
				controller: "CollabController as model",
				resolve: {
					setUser: setCurrentUser
				}
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

var setCurrentUser =function ($q, $timeout, $http, $location, $rootScope) {
	var deferred = $q.defer();

	$http.get('/api/project/loggedin')
		.success(function (user) {
			if (user !== '0') {
				$rootScope.currentUser = user;
				deferred.resolve();
			}
			else {
				deferred.resolve();
			}
		});

	return deferred.promise;
};
