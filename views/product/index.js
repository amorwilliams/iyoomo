'use strict';

exports.init = function(req, res){
	res.render('product/index', {
			title: 'product',
			page: 'product',
			user: req.currentUser,
			error: req.flash('error').toString(),
			success: req.flash('success').toString()
		});
};