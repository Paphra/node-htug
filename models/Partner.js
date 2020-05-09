var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
	name: {type: String, required: true},
	desc: String,
	email: String,
	phone: String,
	image: String,
	createdOn: {type: Date, default: Date.now},
});

// virtual
PartnerSchema.virtual('url').get(function(){
	return '/partners/' + this._id;
});

PartnerSchema.virtual('created').get(function(){
	return moment(this.createdOn).format('MMM Do, YYYY');
});

module.exports = mongoose.model('Partner', PartnerSchema);