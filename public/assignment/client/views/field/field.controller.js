"use strict";

(function () {
	angular
	.module("FormBuilderApp")
	.controller("FieldController", FieldController);

	function FieldController (FieldService, FormService, $routeParams) {
		var model = this;
		var userId = $routeParams.userId;
		var formId = $routeParams.formId;

		model.addField = addField;
		model.removeField = removeField;

		function init () {
			FieldService
			.findAllFormFields(formId)
			.then(initFields);
		}

		init();

		function initFields (fields) {
			model.fields = fields;
		}

		function addField(field) {

		}

		function removeField (field) {

		}
	}
}) ();