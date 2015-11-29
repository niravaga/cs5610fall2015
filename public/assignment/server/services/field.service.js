module.exports = function (app, model) {

	app.get("/api/assignment/form/:formId/field", findAllFormFields);
	app.post("/api/assignment/form/:formId/field", createFormField);
	app.get("/api/assignment/form/:formId/field/:fieldIndex", findFormField);
	app.delete("/api/assignment/form/:formId/field/:fieldIndex", deleteFormField);
	app.put("/api/assignment/form/:formId/field/:fieldIndex", updateFormField);

	function findAllFormFields(req, res) {
		// console.log("Test");

		var formId = req.params.formId;
		model
			.findAllFormFields(formId)
			.then(function (fields) {
				res.json(fields);
			});
	}

	function createFormField(req, res) {
		var formId = req.params.formId;
		var field = req.body;
		// console.log(field);
		res.json(model.createFormField(formId, field));
	}

	function findFormField(req, res) {
		var formId = req.params.formId;
		var fieldIndex = req.params.fieldIndex;

		res.json(model.findFormField(formId, fieldIndex));
	}

	function deleteFormField(req, res) {
		var formId = req.params.formId;
		var fieldIndex = req.params.fieldIndex;

		model
			.deleteFormField(formId, fieldIndex)
			.then(function (form) {
				res.json(form);
			});
	}

	function updateFormField(req, res) {
		var formId = req.params.formId;
		var fieldIndex = req.params.fieldIndex;
		var field = req.body;

		model
			.updateFormField(formId, fieldIndex, field)
			.then(function (form) {
				res.json(form);
			});
	}
};