var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Category Schema
 */


var CategorySchema = new Schema({
	name: { type: String, required: true },
	desc: { type: String, required: false }
});

// virtuals
CategorySchema.virtual('url').get(
	function(){
		return '/categories/' + this._id;
	}
)

module.exports = mongoose.model('Category', CategorySchema);