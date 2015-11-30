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

		model
			.createForm(newForm)
			.then(function (form) {
				res.json(form);
			});
	}

	function createFormForUser(req, res) {
		var newForm = req.body;
		var userId = req.params.userId;

		model
			.createFormForUser(userId, newForm)
			.then(function (forms) {
				res.json(forms);
			});
	}

	function findAllForms(req, res) {
		model
			.findAllForms()
			.then(function (forms) {
				res.json(forms);
			});
	}

	function findFormById(req, res) {
		var formId = req.params.formId;

		model
			.findFormById(formId)
			.then(function (form) {
				res.json(form);
			});
	}

	function updateForm(req, res) {
		var formId = req.params.formId;
		var updatedForm = req.body;

		model
			.updateForm(formId, updatedForm)
			.then(function (form) {
				res.json(form);
			});
	}

	function findFormsByUser(req, res) {
		var userId = req.params.userId;

		model
			.findFormsByUser(userId)
			.then(function (forms) {
				res.json(forms);
			});
	}

	function deleteFormById(req, res) {
		var formId = req.params.formId;

		model
			.deleteFormById(formId)
			.then(function (forms) {
				res.json(forms);
			});
	}
};

