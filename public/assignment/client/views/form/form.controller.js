(function () {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);

	function FormController($rootScope, FormService) {

		var model = this;
		model.addForm = addForm;
		model.updateForm = updateForm;
		model.selectForm = selectForm;
		model.deleteForm = deleteForm;
		model.updateForm = updateForm;

		var currUser = $rootScope.loggedInUser;
		model.user = currUser;

		function init() {
			FormService
				.findAllFormsForUser(currUser._id)
				.then(foundForms);
		}

		init();

		function foundForms(userForms) {
			model.forms = userForms;
		}

		function addForm() {
			var newForm = model.newForm;
			newForm.fields = [];

			FormService.createFormForUser(currUser._id, newForm)
				.then(formAdded);
		}


		function updateForm() {
			var updatedForm = model.newForm;
			var formId = updatedForm._id;

			FormService
				.updateFormById(formId, updatedForm)
				.then(init);
		}


		function selectForm(formId) {
			FormService
				.findFormById(formId)
				.then(function (form) {
					model.newForm = form;
				});
		}

		function deleteForm(formId) {
			FormService
				.deleteFormById(formId)
				.then(init);
		}

		function formAdded(forms) {
			init();
			model.newForm = {};
		}
	}
})();