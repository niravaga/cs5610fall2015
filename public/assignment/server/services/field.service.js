module.exports = function (app, model) {

	app.get("/api/assignment/form/:formId/field", findAllFormFields);
	// app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
	// app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
	// app.post("/api/assignment/form/:formId/field", addFormField);
	// app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);

	function findAllFormFields (req, res) {
		// console.log("Test");
		
		var formId = req.params.formId;
		res.json(model.findAllFormFields(formId));
	}
};