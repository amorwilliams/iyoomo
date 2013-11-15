'use strict';

exports.init = function(req, res){
	res.render('index', {
				title: 'IYOOMO.COM',
				user: req.currentUser,
				error: req.flash('error').toString(),
				success: req.flash('success').toString()
			});
};