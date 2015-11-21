"use strict";

(function () {
	angular
		.module("FormBuilderApp")
		.controller("FieldController", FieldController);

	function FieldController(FieldService, FormService, $routeParams) {
		var model = this;
		var userId = $routeParams.userId;
		var formId = $routeParams.formId;

		model.addField = addField;
		model.removeField = removeField;

		FormService
			.findFormById(formId)
			.then(function (form) {
				model.form = form;
			});

		function init() {
			FieldService
				.getFieldsForForm(formId)
				.then(initFields);
		}

		init();

		function initFields(fields) {
			model.fields = fields;
		}

		function addField(fieldType) {
			var newField;
			switch (fieldType) {
				case "SingleLineText":
					newField = {
						"id": null,
						"label": "New Text Field",
						"type": "TEXT",
						"placeholder": "New Field"
					};
					break;
				case "Date":
					newField = {
						"id": null,
						"label": "New Date Field",
						"type": "DATE"
					};
					break;
				case "Dropdown":
					newField = {
						"id": null,
						"label": "New Dropdown",
						"type": "OPTIONS",
						"options": [
							{ "label": "Option 1", "value": "OPTION_1" },
							{ "label": "Option 2", "value": "OPTION_2" },
							{ "label": "Option 3", "value": "OPTION_3" }
						]
					};
					break;
				case "Checkboxes":
					newField = {
						"id": null,
						"label": "New Checkboxes",
						"type": "CHECKBOXES",
						"options": [
							{ "label": "Option A", "value": "OPTION_A" },
							{ "label": "Option B", "value": "OPTION_B" },
							{ "label": "Option C", "value": "OPTION_C" }
						]
					};
					break;
				case "RadioButtons":
					newField = {
						"id": null,
						"label": "New Radio Buttons",
						"type": "RADIOS",
						"options": [
							{ "label": "Option X", "value": "OPTION_X" },
							{ "label": "Option Y", "value": "OPTION_Y" },
							{ "label": "Option Z", "value": "OPTION_Z" }
						]
					};
					break;
				case "MultiLineText":
					newField = {
						"id": null,
						"label": "New Text Field",
						"type": "TEXTAREA",
						"placeholder": "New Field"
					};
			}

			FieldService
				.createFieldForForm(formId, newField)
				.then(init);
		}

		function removeField(fieldId) {

			FieldService
				.deleteFieldFromForm(formId, fieldId)
				.then(init);
		}
	}
})();