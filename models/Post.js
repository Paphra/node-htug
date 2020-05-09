var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var moment = require('moment');

mongoose.plugin(slug);

var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: {type: String, required: true},
	slug: {type: String, slug: 'title'},
	
	image: {type: String, required: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	tags: [String],
	desc: {type: String, required: false},
	
	updatedOn: {type: Date, default: Date.now},
	createdOn: {type: Date, default: Date.now},
});

// virtual
PostSchema.virtual('created').get(function(){
	return moment(this.createdOn).format('MMM Do, YYYY');
});

PostSchema.virtual('url').get(function(){
	return '/events/' + this.slug;
});

module.exports = mongoose.model('Post', PostSchema);
