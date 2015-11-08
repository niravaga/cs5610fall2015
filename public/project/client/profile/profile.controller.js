(function () {
	angular
	.module("TripPlannerApp")
	.controller("profileController", profileController);

	function profileController($scope) {

		$scope.deleteTrip = deleteTrip;

		function deleteTrip(){
			
		}
	}
}) ();