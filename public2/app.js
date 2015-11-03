(function () {
	angular
		.module("WhiteBoardApp", [])
		.controller("CourseController", CourseController);

	function CourseController($scope, $http, CourseService) {
		CourseService.readAllCourses(renderCourses);
		
		function renderCourses(response) {
			$scope.courses = response;
		}
		
		
		function renderCourse(response) {
			$scope.course = response;
		}

		$scope.selectCourse = selectCourse;
		
		function selectCourse(index) {
			$scope.selectedCourseIndex = index;
			CourseService.readCourseById(index, renderCourse);
		}
	}
})();