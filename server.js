var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbClient = require('./static/db/dbConnection.js').getConnection();

var app = express();
dbClient.connect();

var PORT = process.env.PORT || 8000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(express.static('./static'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/index.html'));
});

app.get('/log', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/captains_log.html'));
});

app.get('/admin/st', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/admin_insert.html'));
});

app.post('/api/publish', function(req, res){
	console.log(req.body)

	var query = "INSERT INTO captains_log (title, article) VALUES ($1, $2)";
	dbClient.query(query, [req.body.title, req.body.article], (error,queryRes) => {
		if(error){
			res.json(error)
		} else {
			res.json(queryRes)
		}
	});

});

app.get('/api/article/latest', function(req,res){
	var query = "SELECT * FROM captains_log";
	dbClient.query(query, (error, queryRes) => {
		if(queryRes.rows.size > 0){
			res.json(queryRes.rows.pop());
		} else {
			res.json({title: 'nada surf'})
		}
	})
});

app.get('/api/article/all', function(req,res){
	var query = "SELECT * FROM captains_log";
	dbClient.query(query, (error, queryRes) => {
		if(queryRes.rows.size > 0){
			res.json(queryRes.rows);
		} else {
			res.json([])
		}
	})
});

app.get("*", function(req,res){
	res.status(404).send('uh oh! page not found')
});

app.listen(PORT);