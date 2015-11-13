module.exports = function (app, db) {
	app.get("/api/assignment/user/:userId/form", findFormsByUser);
	app.get("/api/assignment/form/:formid/field/:fieldId", findFormFieldById);
	app.delete("/api/assignment/form/:formid/field/:fieldId", deleteFormFieldById);
	app.post("/api/assignment/form/:formId/field", addFormField);
	app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);
	
	function findFormsByUser(req, res) {
		
	}
	
	function findFormFieldById(req, res) {
		
	}
	
	function deleteFormFieldById(req, res) {
		
	}
	
	function addFormField(req, res) {
		
	}
	
	function updateFormField(req, res) {
		
	}
};

