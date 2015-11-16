module.exports = function (app, model) {

	app.get("/api/assignment/form/:formId/field", findAllFormFields);
	// app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
	app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
	app.post("/api/assignment/form/:formId/field", createFormField);
	// app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);

	function findAllFormFields (req, res) {
		// console.log("Test");

		var formId = req.params.formId;
		res.json(model.findAllFormFields(formId));
	}

	function createFormField (req, res) {
		var formId = req.params.formId;
		var field = req.body;
		console.log(field);
		res.json(model.createFormField(formId, field));
	}

	function deleteFormField (req, res) {
		var formId = req.params.formId;
		var fieldId = req.params.fieldId;

		res.json(model.deleteFormField(formId, fieldId));
	}
};