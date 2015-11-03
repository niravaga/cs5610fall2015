(function () {
	angular
		.module("WhiteBoardApp")
		.factory("CourseService", CourseService);
		
	function CourseService($http) {
		var service = {
			createCourse: createCourse,
			readAllCourses: readAllCourses,
			readCourseById: readCourseById,
			deleteCourseById: deleteCourseById,
			updateCourseById: updateCourseById
		};
		return service;
		
		function readAllCourses(callback){
			$http.get("/rest/course")
				.success(callback);
		}
		
		function createCourse() { }
		
		function readCourseById(id, callback) { 
			$http
				.get("rest/course/" + id)
				.success(callback);
		}
		
		function deleteCourseById() { }
		
		function updateCourseById() { }
	}
}) ();