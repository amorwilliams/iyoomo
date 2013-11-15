'use strict';

exports.http404 = function(req, res){
	throw new NotFound;
};

exports.http500 = function(req, res){
	throw new Error('An expected error');
};

exports.httpBad = function(req, res){
	unknownMethod();
};