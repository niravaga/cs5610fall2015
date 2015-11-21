var express = require('express');
var app = express();
var courses = [
	{ title: "Web 101", seats: 22, start: new Date() },
	{ title: "Algorithms", seats: 35, start: new Date(2015, 9, 4) },
	{ title: "PDP", seats: 40, start: new Date(2016, 1, 1) }
];

app.use(express.static(__dirname + "/public2"));


app.get("/rest/course/:id", function (req, res) {
	var index = req.params["id"];
	res.send(courses[index]);
});

app.get("/rest/course", function (req, res) {

	res.send(courses);
});

app.listen(3000);
