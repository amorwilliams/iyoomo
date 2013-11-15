'use strict';

var jade = require('jade');
var models = require('../../models/models.js');
var User = models.User;

exports.init = function(req, res){
	res.send('This is a sign in page');
};

exports.signin = function(req, res){
	//查询用户
		User.findOne({email:req.body.email}, function(err, user){
			if(user){
				//如果存在，返回用户所有信息
				if(!user.authenticate(req.body.password)){
					console.log('密码不正确');
					req.flash('error', '用户不存在或密码不正确');
					return res.json({
						status:'failure',
						reason: ''
					});
/* 					return res.redirect('/'); */
				}else{
					req.session.user_id = user.id;
					req.currentUser = user;
					console.log('登陆成功');
					var html = jade.renderFile('views/includes/topmenu.jade', {user: user});
					return res.json({status:'success', html: html});
/* 					return res.redirect('/'); */
				}
			}else{
				console.log('用户不存在');
				req.flash('error', '用户不存在或密码不正确');
				return res.json({
					status:'failure',
					reason:''
				});
/* 				return res.redirect('/'); */
			}
		});
};