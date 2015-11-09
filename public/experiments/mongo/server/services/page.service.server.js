module.exports = function (app, model) {
	app.post("/api/experiments/mongo/pe/page", addPage);
	app.get("/api/experiments/mongo/pe/page", getAllPages);
	app.get("/api/experiments/mongo/pe/page/:id", getPageById);
	
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
};