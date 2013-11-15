'use strict';

exports.init = function(req, res){
	if(req.session.user_id){
			req.currentUser = null;
			req.session.user_id = null;
			console.log('登出成功');
			req.flash('success', '登出成功');
			res.clearCookie();
		}
	res.redirect('/');;
};