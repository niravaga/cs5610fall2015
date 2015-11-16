var forms = require("./form.mock.json");
var uuid = require("node-uuid");

module.exports = function (app) {

	var api = {
		createForm: createForm,
		createFormForUser: createFormForUser,
		findAllForms: findAllForms,
		findFormById: findFormById,
		updateForm: updateForm,
		deleteFormById: deleteFormById,
		findFormByTitle: findFormByTitle,
		findFormsByUser: findFormsByUser,
		findAllFormFields: findAllFormFields,
		createFormField: createFormField,
		deleteFormField: deleteFormField,
		findFormField: findFormField
	};

	return api;

	function createForm (newForm) {
		var form = newForm;
		form.id = uuid.v1();

		console.log(form);
		forms.push(form);

		return forms;
	}

	function createFormForUser (userId, newForm) {
		newForm.userId = userId;

		return createForm(newForm);
	}

	function findAllForms () {
		return forms;
	}

	function findFormById (id) {
		for(var i in forms) {
			if (forms[i].id == id) {
				return forms[i];
			}
		}
	}

	function updateForm (id, updatedForm) {
		for(var i in forms) {
			if (forms[i].id == id) {
				forms[i] = updatedForm;
				break;
			}
		}

		return updatedForm;
	}

	function deleteFormById (id) {
		for(var i in forms) {
			if (forms[i].id == id) {
				forms.splice(i, 1);
				break;
			}
		}

		return forms;

	}

	function findFormByTitle (title) {
		for(var i in forms) {
			if (forms[i].title == title) {
				return forms[i];
			}
		}
	}
	
	function findFormsByUser (userId) {
		var userForms = [];

		for(var i in forms) {
			if (forms[i].userId == userId) {
				userForms.push(forms[i]);
			}
		}

		return userForms;
	}

	function findAllFormFields (formId) {
		var form = findFormById(formId);

		// console.log(form.fields);
		return form.fields;
	}

	function createFormField (formId, field) {
		var form = findFormById(formId);

		field.id = uuid.v1();

		form.fields.push(field);

		return form.fields;
	}

	function findFormField (formId, fieldId) {
		var fields = findAllFormFields(formId);

		for (var i in fields) {
			if (fields[i].id == fieldId) {
				return fields[i];
			}
		}
	}

	function deleteFormField (formId, fieldId) {
		var form = findFormById(formId);

		for(var i in form.fields) {
			var thisField = form.fields[i];

			if (thisField.id == fieldId) {
				form.fields.splice(i, 1);
				break;
			}
		}

		return forms.fields;
	}
};