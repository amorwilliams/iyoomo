'use strict';

exports.init = function(req, res){
	res.render('product/create/index', {
			title: 'publish your product',
			page: 'create',
			user: req.currentUser,
			error: req.flash('error').toString(),
			success: req.flash('success').toString()
		});
};

exports.partials = function (req, res) {
	var name = req.params.name;
	res.render('product/create/partials/' + name);
};