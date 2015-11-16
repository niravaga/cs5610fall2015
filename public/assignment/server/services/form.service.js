module.exports = function (app, model) {
	app.post("/api/assignment/form", createForm);
	app.post("/api/assignment/user/:userId/form", createFormForUser);
	app.get("/api/assignment/form", findAllForms);
	app.get("/api/assignment/form/:formId", findFormById);
	app.put("/api/assignment/form/:formId", updateForm);
	app.get("/api/assignment/user/:userId/form", findFormsByUser);
	
	app.delete("/api/assignment/form/:formId", deleteFormById);
	
	function createForm(req, res) {
		var newForm = req.body;
		res.json(model.createForm(newForm));
	}

	function createFormForUser (req, res) {
		var newForm = req.body;
		var userId = req.params.userId;
		res.json(model.createFormForUser(userId, newForm));
	}

	function findAllForms (req, res) {
		res.json(model.findAllForms());
	}

	function findFormById (req, res) {
		var formId = req.params.formId;
		res.json(model.findFormById(formId));
	}

	function updateForm (req, res) {
		var formId = req.params.formId;
		var updatedForm = req.body;

		res.json(model.updateForm(id, updatedForm));
	}

	function findFormsByUser (req, res) {
		var userId = req.params.userId;
		
		res.json(model.findFormsByUser(userId));		
	}

	function deleteFormById (req, res) {
		var formId = req.params.formId;

		res.json(model.deleteFormById(formId));
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

