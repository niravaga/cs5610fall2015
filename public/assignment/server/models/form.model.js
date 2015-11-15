var forms = require("./form.mock.json");
var uuid = require("node-uuid");

module.exports = function (app) {

	var api = {
		createForm: createForm,
		findAllForms: findAllForms,
		findFormById: findFormById,
		updateForm: updateForm,
		deleteForm: deleteForm,
		findFormByTitle: findFormByTitle
	};

	return api;

	function createForm (newForm) {
		var form = newForm;
		form.id = uuid.v1();

		console.log(form);
		forms.push(form);

		return forms;
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

	function deleteForm (id) {
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
};