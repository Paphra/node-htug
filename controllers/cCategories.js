var {validationResult} = require('express-validator');
var Category = require('../models/Category');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class CategoryController{

	// get all categories
	static getAllCategories(req, res){
		Category.find({}, (err, categories)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: categories,
				message: 'All Categories',
			});
		});
	}

	static getSingleCategory(req, res){
		Category.findById(req.params.id, (err, category)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: category,
				message: 'Single Category',
			});
		});
	}

	static deleteCategory(req, res){
		Category.findByIdAndDelete(req.params.id, (err, category)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: category,
				message: 'Successfully Deleted!',
			});
		});
	}

	static saveCategory(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are some errors with your data!',
			});
		}
		let category = new Category(req.body);
		category.save((err, category)=>{
			if(err) return error(err, res);
			return res.status(201).json({
				data: category,
				message: 'Successfully Saved Category',
			});
		});
	}

	static updateCategory(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are Some errors with your data!',
			});
		}
		let category = new Category(req.body);
		category._id = req.params.id;

		Category.findByIdAndUpdate(req.params.id, category, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: updated,
				message: 'Successfully Updated Category!',
			});
		});
	}
}

module.exports = CategoryController;