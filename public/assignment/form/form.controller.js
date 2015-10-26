(function() {
	angular
	.module("FormBuilderApp")
	.controller("FormController", FormController);

	function FormController ($scope, $rootScope, UserService, FormService) {
		
		var currUser = $rootScope.$loggedInUser;
		// console.log(currUser);

		FormService.findAllFormsForUser(currUser.id, foundForms);

		function foundForms (userForms) {
			$scope.$forms = userForms;
		}

		$scope.addForm = function() {
			var myNewForm = {};

			myNewForm.name = $scope.newForm.name;

			// newForm.name = $scope.$newForm.name;

			FormService.createFormForUser(currUser.id, myNewForm, formAdded);
		}

		$scope.updateForm = function() {

		}

		$scope.deleteForm = function(index) {
			FormService.deleteFormById($scope.$forms[index].id, function (allForms) {
				FormService.findAllFormsForUser(currUser.id, foundForms);
			});
		}

		$scope.selectForm = function(index) {
			
		}

		function formAdded(updatedForm) {
			$scope.$forms.push(updatedForm);
			$scope.newForm = {};

			console.log(updatedForm);
		}
	}
}) ();