(function() {
	angular
	.module("PageEditorApp")
	.config(Configuration);

	function Configuration ($routeProvider) {
		$routeProvider
		.when("/page", {
			templateUrl: "page/page.list.view.html",
			controller: "PageListController",
			controllerAs: "model"
		});	
	}
}) ();