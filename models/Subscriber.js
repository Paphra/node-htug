var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
	fullName: String,
	email: {type: String, unique: true},
	active: {type: Boolean, default: true},
});

// virtual
SubscriberSchema.virtual('url').get(function(){
	return '/subscribers/' + this._id;
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);