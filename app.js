'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var mongoose = require('mongoose');
var ex_mongoose = require('express-mongoose');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');
var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');

var assetsMiddleware = assetManager(settings.assetsSettings);

var app = express();

//set db
var setDatabase = function(dbSettings){
	var dbUrl = 'mongodb://';
	dbUrl += dbSettings.username+':'+dbSettings.password+'@';
	dbUrl += dbSettings.host+':'+dbSettings.port;
	dbUrl += '/'+dbSettings.db;
	app.set('db-url', dbUrl);
	app.set('db', dbSettings);
}

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	setDatabase(settings.mongodb.testdb);
}

// production only
if ('production' == app.get('env')) {
	setDatabase(settings.mongodb.db);
}

var sessionSetting = {
	secret: settings.mongodb.cookieSecret,
	maxAge: new Date(Date.now() + 3600000),
	store: new MongoStore(app.set('db'))
};


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session(sessionSetting));
app.use(app.router);
app.use(assetsMiddleware);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//route requests
require('./routes')(app);

//Connect MongoDB
mongoose.connect(app.set('db-url'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
	console.log('Mongoose connected to DB');
		http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});