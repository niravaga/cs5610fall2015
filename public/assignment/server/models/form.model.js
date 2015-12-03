// var forms = require("./form.mock.json");
// var uuid = require("node-uuid");
var q = require("q");

module.exports = function (mongoose, db) {

	var FormSchema = require("./form.schema.js")(mongoose);
	var FormModel = mongoose.model("FormModel", FormSchema);

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
		findFormField: findFormField,
		updateFormField: updateFormField
	};

	return api;

	function createForm(newForm) {
		var deferred = q.defer();

		if (newForm["_id"])
			delete newForm["_id"];

		FormModel.create(newForm, function (err, doc) {
			FormModel.create(function (err, forms) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(forms);
				}
			});
		});

		return deferred.promise;
	}

	function createFormForUser(userId, newForm) {
		newForm.userId = userId;

		return createForm(newForm);
	}

	function findAllForms() {
		var deferred = q.defer();

		FormModel.find(function (err, forms) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(forms);
			}
		});

		return deferred.promise;
	}

	function findFormById(id) {
		var deferred = q.defer();

		FormModel.findById(id, function (err, form) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(form);
			}
		});

		return deferred.promise;
	}

	function updateForm(id, updatedForm) {
		var deferred = q.defer();

		delete updatedForm["_id"];

		FormModel.update(
			{ _id: id, }, { $set: updatedForm },
			function (err, newForm) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(newForm);
				}
			});

		return deferred.promise;
	}

	function deleteFormById(id) {
		var deferred = q.defer();

		FormModel.remove({ _id: id }, function (err, status) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(status);
			}
		});

		return deferred.promise;

	}

	function findFormByTitle(title) {
		var deferred = q.defer();

		FormModel.find({ title: title }, function (err, forms) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(forms);
			}
		});

		return deferred.promise;
	}

	function findFormsByUser(userId) {
		var deferred = q.defer();

		FormModel.find({ userId: userId }, function (err, forms) {
			deferred.resolve(forms);
		});

		return deferred.promise;
	}

	function findAllFormFields(formId) {

		var deferred = q.defer();

		FormModel.findById(formId, { "fields": 1, "_id": 0 }, function (err, fields) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(fields);
			}
		});

		return deferred.promise;
	}

	function createFormField(formId, field) {
		var deferred = q.defer();

		FormModel.findById(formId, function (err, form) {
			if (err) {
				deferred.reject(err);
			} else {
				form.fields.push(field);
				form.save(function (err, form) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(form);
					}
				});
			}
		});

		return deferred.promise;
	}

	function findFormField(formId, fieldIndex) {

		var deferred = q.defer();

		FormModel.findById(formId, function (err, form) {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(form.fields[fieldIndex]);
			}
		});

		return deferred.promise;


	}

	function deleteFormField(formId, fieldIndex) {
		var deferred = q.defer();

		FormModel.findById(formId, function (err, form) {
			form.fields.splice(fieldIndex, 1);

			form.save(function (err, form) {
				if (err) {
					deferred.reject(err);
				} else {
					deferred.resolve(form);
				}
			});
		});

		return deferred.promise;
	}

	function updateFormField(formId, fieldIndex, field) {
		var deferred = q.defer();

		FormModel.findById(formId, function (err, form) {
			if (err) {
				deferred.reject(err);
			} else {
				form.fields[fieldIndex].literal = field.literal;
				form.save(function (err, form) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(form);
					}
				});
			}
		});

		return deferred.promise;
	}
};
