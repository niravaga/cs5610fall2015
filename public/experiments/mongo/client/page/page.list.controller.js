(function() {
	angular
	.module("PageEditorApp")
	.controller("PageListController", PageListController);

	function PageListController (PageService) {
		var model = this;
		model.addPage = addPage;

		function init() {
			model.pages = PageService.getAllPages();

		}

		init();

		function addPage (page) {
			PageService
			.addPage(page)
				.then(function (pages) {
					console.log(pages);
				model.pages = pages;
			});
			// console.log(page);		
		}
		}
	}) ();