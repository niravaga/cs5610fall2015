(function() {
	angular
	.module("PageEditorApp")
	.factory("PageService", PageService);

	function PageService($http, $q) {
		var api = {
			getAllPages: getAllPages,
			addPage: addPage,
			getPageById: getPageById,
			addContent: addContent
		};

		return api;

		function getAllPages () {
			var deferred = $q.defer();
			
			$http.get("/api/experiments/mongo/pe/page")
			.success(function (pages) {
				deferred.resolve(pages);
			});
			
			return deferred.promise;
		}

		function addPage (page) {
			var deferred = $q.defer();
			$http
			.post("/api/experiments/mongo/pe/page", page)
			.success(function (pages) {
				deferred.resolve(pages);
			});

			return deferred.promise;
		}
		
		function getPageById (pageId) {
			var deferred = $q.defer();
			
			$http
			.get("/api/experiments/mongo/pe/page/" + pageId)
			.success(function (page) {
				deferred.resolve(page);
			});
			
			return deferred.promise;
		}
		
		function addContent (pageId, contentType) {
			var deferred = $q.defer();
			
			$http
			.post("/api/experiments/mongo/pe/page/" + pageId + "/content/" + contentType)
			.success(function (page) {
				deferred.resolve(page);
			});
			
			return deferred.promise;
		}
	}
}) ();