"use strict";

(function () {
	angular
	.module("FormBuilderApp")
	.factory("FieldService", FieldService);

	function FieldService ($http, $q) {

		var api = {
			findAllFormFields : findAllFormFields,
			createFormField : createFormField,
			deleteFormField : deleteFormField
		};
		return api;

		function findAllFormFields (formId) {
			var deferred = $q.defer();
			
			$http
			.get("/api/assignment/form/" + formId + "/field")
			.success(function (feilds) {
				deferred.resolve(feilds);
			});

			return deferred.promise;
		}

		function createFormField (formId, feild) {
			var deferred = $q.defer();

			$http
			.post("/api/assignment/form/" + formId + "/field", newField)
			.success(function (response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		}

		function deleteFormField (formId, feildId) {
			var deferred = $q.defer();

			$http
			.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
			.success(function (feilds) {
				deferred.resolve(feilds);
			});

			return deferred.promise;
		}
	}
}) ();