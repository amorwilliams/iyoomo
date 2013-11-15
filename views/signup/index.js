'use strict';

var models = require('../../models/models.js');
var User = models.User;

exports.init = function(req, res){
	res.send('This is a sign up page');
};

exports.signup = function(req, res){
	var password = req.body.password;
	var repassword = req.body['repassword'];
	console.log(password);
	if(repassword != password){
		req.flash('error', '两次输入的密码不一致!');
		console.log('两次输入的密码不一致!');
		return res.redirect('/');
	}
	
	var newUser 	 = new User();
	newUser.email 	 = req.body.email;
	newUser.name 	 = req.body.username;
	newUser.password = password;
	
	//检测注册用户email是否存在
	User.findOne({email: newUser.email}, function(err, user){
		if(user){
			err = '用户已存在！';
		}
		if(err){
			req.flash('error', err);
			console.log(err);
			return res.redirect('/');
		}
		//保存用户到数据库
		newUser.save(function (err, product, numberAffected){
			if(err){
				req.flash('error', err);
				console.log(err);
				return res.redirect('/');
			}
			//成功后，将用户信息记录在页面间的会话req.session中，并且跳转到一个新页面，就是内容集中展示页面
			req.session.user_id = newUser.id;
			console.log(newUser.id);
			req.flash('success','注册成功!'); 
			res.redirect('/');
		});
	});
};