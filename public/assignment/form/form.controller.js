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

		$scope.addForm = function(newForm) {
			var myNewForm = {};

			myNewForm.name = newForm.name;

			// newForm.name = $scope.$newForm.name;

			FormService.createFormForUser(currUser.id, myNewForm, formAdded);
		}

		$scope.updateForm = function() {

		}

		$scope.deleteForm = function() {

		}

		$scope.selectForm = function() {

		}

		function formAdded(updatedForm) {
			var newForm = updatedForm;
			$scope.$forms.push(newForm);
			console.log(newForm);
		}
	}
}) ();