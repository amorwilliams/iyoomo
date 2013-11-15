'use strict';

var models = require('./models/models.js');
var User = models.User;

function loadUser(req, res, next) {
	if (req.session.user_id) {
		User.findById(req.session.user_id, function(err, user) {
			if (user) {
				req.currentUser = user; 
				next();
			}else{
				next();
			}
		});
	}else{
		next();
	}
}

exports = module.exports = function(app){
	//front end
	app.get('/', loadUser, require('./views/index').init);
	
	//sign up
	app.get('/signup', require('./views/signup/index').init);
	app.post('/signup', require('./views/signup/index').signup);
	
	//login/out
	app.get('/signin', loadUser, require('./views/signin/index').init);
	app.post('/signin', loadUser, require('./views/signin/index').signin);
	app.get('/signout', loadUser, require('./views/signout/index').init);
	
	//product
	app.get('/product', loadUser, require('./views/product/index').init);
	app.get('/product/create', loadUser, require('./views/product/create/index').init)
	
	
	
	//route not found
/* 	app.all('*', require('./views/http/index').http404); */
};