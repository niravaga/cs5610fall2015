(function () {
	angular
		.module("PageEditorApp")
		.controller("PageDetailsController", PageDetailsController);

	function PageDetailsController(PageService, $routeParams) {
		var model = this;

		var pageId = $routeParams.pageId;

		function init() {
			PageService.getPageById(pageId)
				.then(function (page) {
					model.page = page;
				});
		}

		init();

	}
})();