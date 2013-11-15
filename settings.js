exports.mongodb = {
	db: {
		db: 'nodejitsudb850658721',
		host: 'paulo.mongohq.com',
		port: 10031,
		username: 'nodejitsu',
		password: '3e451e06699ccaa60b989a25b66e8882',
		collection: 'sessions'
	},
	testdb:{
		db: 'iyoomo',
		host: 'localhost',
		port: 10001,
		username: 'test',
		password: 'test',
		collection: 'sessions'
	},
	cookieSecret: 'iyoomo'
}

var stylus = require('stylus');
var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');
exports.assetsSettings = {
	'js': {
		'route': /\/static\/js\/[0-9]+\/.*\.js/
		, 'path': './public/js/'
		, 'dataType': 'javascript'
		, 'files': [
			'lib/underscore/underscore.js'
			,'lib/backbone/backbone.js'
			,'semantic.js'
			, 'lib/base/base.js'
			, 'iyoomo.js'
			, 'auth.js'
		]
		, 'debug': true
		, 'stale': false
		, 'postManipulate': {
			'^': [
/* 				assetHandler.yuiJsOptimize */
			]
		}
	}
	, 'css': {
		'route': /\/static\/css\/[0-9]+\/.*\.css/
		, 'path': './public/css/'
		, 'dataType': 'css'
		, 'files': [
			'iyoomo.styl'
		]
		, 'debug': true
		, 'stale': false
		, 'preManipulate': {
			'^':[
				function(file, path, index, isLast, callback) {  
					var match;  
					match = path.match(/\.styl$/);  
					if ((match != null) && match.length > 0) {  
						return stylus.render(file, function(e, css) {  
							return callback(css);  
						});
					} else {  
						return callback(file);  
					}
				} 
			]
		}
		, 'postManipulate': {
			'^': [
				assetHandler.fixVendorPrefixes
				, assetHandler.fixGradients
				, assetHandler.replaceImageRefToBase64(__dirname+'/public')
/* 				, assetHandler.yuiCssOptimize */
			]
		}
	}
}

exports.resizeVersion = {
    default: {
        thumbnail:{
            width:80,
            height:"80!"
        },
        small: {
            width:200,
            height:"150!"
        },
        medium:{
            width:400,
            height:300
        },
        large: {
            width: 800,
            height: 600
        }
    },
    location : {
        thumbnail:{
            width:80,
            height:"80^",
            imageArgs: [
                "-gravity", "center",
                "-extent", "80x80"
            ]
        },
        small: {
            width:"200",
            height:"150^",
            imageArgs: [
                "-gravity", "center",
                "-extent", "200x150"
            ]
        },
        medium:{
            width:400,
            height:300
        },
        large: {
            width: 800,
            height: 600
        }
    }
};

exports.directors = {
    temp: './tmp',

    default: '/public/uploads/default',
    default_url: '/uploads/default',

    location: '/public/uploads/location',
    location_url: '/uploads/location'
};