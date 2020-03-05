var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./static/db/dbConnection.js');

//modules used for passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
//adding sessions to the sessions table in the database
var PostgreSqlStore = require('connect-pg-simple')(session);
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();
var dbClient = db.getConnection()
dbClient.connect();

var PORT = process.env.PORT || 8000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(express.static('./static'));

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
	secret: "secret",
	resave : true,
	saveUninitialized : false,
	store : new PostgreSqlStore({
		conString: db.retrieveDbUrl()
	})
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/index.html'));
});

app.get('/log', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/captains_log.html'));
});

app.get('/admin/su', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/sign_up.html'));
});

app.get('/admin/si', function(req,res){
	res.sendFile(path.join(__dirname, './static/html/sign_in.html'));
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
		if(queryRes && queryRes.rows.size > 0){
			res.json(queryRes.rows.pop());
		} else {
			res.json({title: 'nada surf'})
		}
	})
});

app.get('/api/article/all', function(req,res){
	var query = "SELECT * FROM captains_log";
	dbClient.query(query, (error, queryRes) => {
		if(queryRes && queryRes.rows.size > 0){
			res.json(queryRes.rows);
		} else {
			res.json([])
		}
	})
});

passport.serializeUser(function(user,done){
	done(null, user);
});

passport.deserializeUser(function(obj,done){
	done(null, obj);
});

passport.use('local-signup', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, username, password, done){
	process.nextTick(function(){
		dbClient.query("SELECT username FROM users WHERE username='" + username + "'", (err, user) => {
			if(user.rows.length > 0){
				return done(null, false, {message: 'username taken'});
			} else {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(password, salt);
				var query = "INSERT INTO users (name, username, password) VALUES ($1,$2,$3)";
				dbClient.query(query, [req.body.name, username, hashedPassword], (error,queryRes) => {
					if(error){
						console.error(error)
					} else {
						return done(null, queryRes)
					}
				});
			};
  		});
    });
}));

app.post('/api/sign-up', function(req,res,next){
	passport.authenticate('local-signup', function(err, user, info){
		if (err) {
			return next(err);
		} else {
			res.json({user: user, info: info})
		}
	})(req, res, next);
});

passport.use('local-signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, username, password, done){
	process.nextTick(function(){
		dbClient.query("SELECT * FROM users WHERE username='" + username + "'", (err, user) => {
			if(user.rows.length < 1)
				return done(null, false, {message: 'no user'});
	        if (!bcrypt.compareSync(password, user.rows[0].password)){
	          return done(null, false, {message: 'incorrect password'});
	        }
			return done(null, user.rows[0]);
		});
	});
}));

app.post('/api/sign-in', function(req,res,next){
	passport.authenticate('local-signin', function(err, user, info){
	    if (err) {
	      	return next(err);
	    }
	    if (!user) {
	    	return res.json({ success : false, message : 'authentication failed', info: info });
	    }
	    req.login(user, function(err){
			if(err){
				return next(err);
			}
	      	return res.status(200).json({ success : true, message : 'authentication succeeded', object : user });        
		});
  	})(req, res, next);
});

app.get('/api/signedin', function(req, res){
	req.user ? res.json({status: "signed in"}) : res.json({error: "no user"})
});

app.get('/api/html/:page', function(req, res){
	var query = "SELECT * FROM html WHERE page='" + req.params.page+ "'";
	dbClient.query(query, (error, queryRes) => {
		if(queryRes && queryRes.rowCount > 0){
			res.json(queryRes.rows);
		} else {
			res.json([])
		}
	})
});

app.put('/api/html/:page', function(req, res){
	var query = "UPDATE html SET text=$1 WHERE page='" + req.params.page + "' AND field_id='" + req.body.field_id + "'";
	dbClient.query(query, [req.body.text], (err,results) => {
		res.json({whatever: 'whatever'})
	});
});

app.get("*", function(req,res){
	res.status(404).send('Page not fucking found')
});

app.listen(PORT);