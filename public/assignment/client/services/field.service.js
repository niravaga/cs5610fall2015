"use strict";

(function () {
	angular
	.module("FormBuilderApp")
	.factory("FieldService", FieldService);

	function FieldService ($http, $q) {

		var api = {
			findAllFormFields : findAllFormFields,
			findFormField: findFormField,
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

		function findFormField (formId, fieldId) {
			var deferred = $q.defer();
			
			$http
			.get("/api/assignment/form/" + formId + "/field")
			.success(function (feilds) {
				deferred.resolve(feilds);
			});

			return deferred.promise;	
		}

		function createFormField (formId, newField) {
			var deferred = $q.defer();

			$http
			.post("/api/assignment/form/" + formId + "/field", newField)
			.success(function (response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		}

		function deleteFormField (formId, fieldId) {
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