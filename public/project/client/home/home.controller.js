(function() {
	angular
	.module("TripPlannerApp")
	.controller("homeController", homeController);

	function homeController ($scope, $http, $location) {
		$scope.hello = "Hello from the controller";
		
		$scope.createTrip = function () { 
			console.log("Creating trip");
			
			var city = $scope.city;
			$http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ city +"&key=AIzaSyBbtkDxjuDPKJJev18t5TEnAGn0t9h-YrQ")
			.then(function (response) {
				$scope.response = response;
				$location.url("/trip-create");
			})
		}
	}
})();