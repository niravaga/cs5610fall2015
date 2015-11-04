(function() {
	angular
	.module("TripPlannerApp")
	.controller("HeaderController", HeaderController);

	function HeaderController($scope, $location) {
		$scope.$location = $location; 
	}
}) ();