(function(){

	var app = angular.module("WhiteBoardApp", []);

	app.controller("HelloWorldController", HelloWorldController);

	function HelloWorldController($scope) {

		$scope.hello = "Hello World"
		$scope.courseName = "Java 101"
		console.log("Hello World!");

		$scope.user = {
			fName: "Nirav",
			lName: "Aga"
		};

		var course1 = {
			title: "WebDev",
			seats: "20",
			starts: new Date()
		};

		var course2 = {
			title: "PDP",
			seats: "40",
			starts: new Date(2015, 9, 12)
		};

		var course3 = {
			title: "CS",
			seats: "25",
			starts: new Date(2015, 10, 10)
		};

		var courses = [course1, course2, course3];

		$scope.courses = courses;

		$scope.removeCourse = function(courseInstance) {
			
			var index = $scope.courses.indexOf(courseInstance);
			console.log(index);

			$scope.courses.splice(index, 1)
		};

	}

}) ();