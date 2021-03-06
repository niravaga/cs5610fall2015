"use strict";

(function () {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

	function FormService($http, $q) {

		var api = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById,
			findFormById: findFormById
		};
		return api;

		function createFormForUser(userId, form) {
			var deferred = $q.defer();

			$http
				.post("/api/assignment/user/" + userId + "/form", form)
				.success(function (form) {
					deferred.resolve(form);
				});

			return deferred.promise;
		}

		function findAllFormsForUser(userId) {
			var deferred = $q.defer();

			$http
				.get("/api/assignment/user/" + userId + "/form")
				.success(function (forms) {
					deferred.resolve(forms);
				});

			return deferred.promise;
		}

		function deleteFormById(formId) {
			var deferred = $q.defer();

			$http
				.delete("/api/assignment/form/" + formId)
				.success(function (forms) {
					deferred.resolve(forms);
				});

			return deferred.promise;
		}

		function updateFormById(formId, updatedForm) {
			var deferred = $q.defer();

			$http
				.put("/api/assignment/form/" + formId, updatedForm)
				.success(function (form) {
					deferred.resolve(form);
				});

			return deferred.promise;
		}

		function findFormById(formId) {
			var deferred = $q.defer();

			$http
				.get("/api/assignment/form/" + formId)
				.success(function (form) {
					deferred.resolve(form);
				});

			return deferred.promise;
		}

	}
})();