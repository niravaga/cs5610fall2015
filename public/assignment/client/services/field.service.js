"use strict";

(function () {
	angular
		.module("FormBuilderApp")
		.factory("FieldService", FieldService);

	function FieldService($http, $q) {

		var api = {
			getFieldsForForm: getFieldsForForm,
			getFieldForForm: getFieldForForm,
			createFieldForForm: createFieldForForm,
			deleteFieldFromForm: deleteFieldFromForm,
			updateField: updateField
		};
		return api;

		function getFieldsForForm(formId) {
			var deferred = $q.defer();

			$http
				.get("/api/assignment/form/" + formId + "/field")
				.success(function (feilds) {
					deferred.resolve(feilds);
				});

			return deferred.promise;
		}

		function getFieldForForm(formId, fieldId) {
			var deferred = $q.defer();

			$http
				.get("/api/assignment/form/" + formId + "/field")
				.success(function (feilds) {
					deferred.resolve(feilds);
				});

			return deferred.promise;
		}

		function createFieldForForm(formId, newField) {
			var deferred = $q.defer();

			$http
				.post("/api/assignment/form/" + formId + "/field", newField)
				.success(function (response) {
					deferred.resolve(response);
				});

			return deferred.promise;
		}

		function deleteFieldFromForm(formId, fieldId) {
			var deferred = $q.defer();

			$http
				.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
				.success(function (feilds) {
					deferred.resolve(feilds);
				});

			return deferred.promise;
		}

		function updateField(formId, fieldId, field) {
			var deferred = $q.defer();

			$http
				.put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
				.success(function (field) {
					deferred.resolve(field);
				});

			return deferred.promise;
		}
	}
})();