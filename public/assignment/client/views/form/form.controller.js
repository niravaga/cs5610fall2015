(function() {
	angular
	.module("FormBuilderApp")
	.controller("FormController", FormController);

	function FormController ($rootScope, FormService) {
		
		var model = this;
		model.addForm = addForm;
		model.updateForm = updateForm;
		model.selectForm = selectForm;
		model.deleteForm = deleteForm;

		currUser = $rootScope.loggedInUser;
		model.user = currUser;
		console.log(model.user);

		function init() {
			FormService
			.findAllFormsForUser(currUser.id)
			.then(foundForms);	
		}
		
		init();

		function foundForms (userForms) {
			model.forms = userForms;
		}

		function addForm() {
			var newForm = model.newForm;
			newForm.fields = [];
			
			FormService.createFormForUser(currUser.id, newForm)
			.then(formAdded);
		}

		
		function updateForm (updatedForm) {
			
		}


		function selectForm (index) {
			
		}

		function deleteForm (formId) {
			FormService
			.deleteFormById(formId)
			.then(init);
		}

		function formAdded(forms) {
			init();
			model.newForm = {};
		}
	}
}) ();