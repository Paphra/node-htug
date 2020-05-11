var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	username: {type: String, min: 5, max: 15, required: true},
	email: {type: String, min: 5, max: 50},
	phone: {type: String},
	image: {type: String},
	
	isAdmin: {type: Boolean, default: false},
	isSuper: {type: Boolean, default: false},
	lastActive: {type: Date},
	createdOn: {type: Date, default: Date.now},

});

// virtual
UserSchema.virtual('name').get(function(){
	return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('url').get(function(){
	return '/users/' + this._id;
});

UserSchema.virtual('created').get(function(){
	return moment(this.createdOn).format('MMM Do, YYYY');
});

module.exports = mongoose.model('User', UserSchema);