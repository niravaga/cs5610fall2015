(function() {
	angular
	.module("TripPlannerApp")
	.controller("homeController", homeController);

	function homeController ($scope) {
		$scope.hello = "Hello from the controller";
	}
})();