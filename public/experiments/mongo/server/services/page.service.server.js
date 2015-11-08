module.exports = function (app) {
	app.post("/api/experiments/mongo/pe/page", addPage);
	
	function addPage(req, res) {
		
		var page = req.body;
		
		var pages = [
			page
		];
		
		console.log(page);
		res.json(pages);
		
	}
};