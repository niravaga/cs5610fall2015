module.exports = function (app, model) {
	app.post("/api/experiments/mongo/pe/page", addPage);
	app.get("/api/experiments/mongo/pe/page", getAllPages);
	app.get("/api/experiments/mongo/pe/page/:id", getPageById);
	app.post("/api/experiments/mongo/pe/page/:pageId/content/:contentType", addContent);

	function addPage(req, res) {
		
		var page = req.body;
		
		model
		.addPage(page)
		.then(function (pages) {
			res.json(pages);
		});
		
		console.log(page);
	}
	
	function getAllPages(req, res) {
		model
		.getAllPages()
		.then(function (pages) {
			res.json(pages);
		});
	}
	
	function getPageById(req, res) {
		var id = req.params.id;
		
		model
		.getPageById(id)
		.then(function (page) {
			res.json(page);
		});
	}
	
	function addContent(req, res) {
		var pageId = req.params["pageId"];
		var contentType = req.params["contentType"];
		
		model
		.addContent(pageId, contentType)
		.then(function (page) {
			res.json(page);
		});
	}
};