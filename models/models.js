var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
	userId: Schema.Types.ObjectId,
	content: String,
	updated: { type: Date, default: Date.now}
});

var Product = new Schema({
	name: String,
	description: String,
	imgUrls: [],
	price: { type: Number, default: 0},
	updated: { type: Date, default: Date.now},
	comments: [Comment]
});

/**
 * Model: User
 */
function validatePresenceOf(value) {
	return value && value.length;
} 

var User = new Schema({
	//注册用户需要的信息name,password,email
	email: { type: String, validate: [validatePresenceOf, 'an email is required'], index:{unique: true}},
	name: String,
	hashed_password: String,
	salt: String,
	//用户上传的产品信息
	products: [Product],
});

User.virtual('id')
	.get(function() {
		return this._id.toHexString();
	});
	
User.virtual('password')
    .set(function(password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password; });

User.method('authenticate', function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  });
  
User.method('makeSalt', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  });

User.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  });

User.pre('save', function(next) {
    if (!validatePresenceOf(this.password)) {
      next(new Error('Invalid password'));
    } else {
      next();
    }
  });


/**
    * Model: LoginToken
    *
    * Used for session persistence.
    */
LoginToken = new Schema({
	email: { type: String, index: true },
	series: { type: String, index: true },
	token: { type: String, index: true }
});

LoginToken.method('randomToken', function() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
});

LoginToken.pre('save', function(next) {
	// Automatically create the tokens
	this.token = this.randomToken();

	if (this.isNew)
		this.series = this.randomToken();

	next();
});

LoginToken.virtual('id')
	.get(function() {
		return this._id.toHexString();
	});

LoginToken.virtual('cookieValue')
	.get(function() {
		return JSON.stringify({ email: this.email, token: this.token, series: this.series });
	});


//export
exports.Comment = mongoose.model('Comment', Comment);
exports.Product = mongoose.model('Product', Product);
exports.User = mongoose.model('User', User);
exports.LoginToken = mongoose.model('LoginToken', LoginToken);
