(function () {
	angular
		.module("PageEditorApp")
		.controller("PageDetailsController", PageDetailsController);

	function PageDetailsController(PageService, $routeParams) {
		var model = this;

		var pageId = $routeParams.pageId;
		
		model.addContent = addContent;
		
		function init() {
			PageService.getPageById(pageId)
				.then(function (page) {
					model.page = page;
				});
		}

		init();
		
		function addContent(contentType) {
			PageService
				.addContent(model.page._id, contentType)
		}

	}
})();