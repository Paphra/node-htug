var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	desc: String,

	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	
	status: {type: String, enum: ['Published', 'Darft',], default: 'Draft'},
	answered: {type: Boolean, default: false},

});

// virtual
QuestionSchema.virtual('created').get(function(){
	return moment(this.createdOn).format('MMM Do, YYYY');
});

QuestionSchema.virtual('updated').get(function(){
	return moment(this.updatedOn).format('MMM Do, YYYY HH:MM');
});

QuestionSchema.virtual('url').get(function(){
	return '/book/' + this._id;
});


module.exports = mongoose.model('Question', QuestionSchema);