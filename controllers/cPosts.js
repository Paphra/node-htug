var {validationResult} = require('express-validator');
var Post = require('../models/Post');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class PostController{

	// get all posts
	static getAllPosts(req, res){
		Post.find({}, (err, posts)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: posts,
				message: 'All Posts',
			});
		});
	}

	static getSinglePost(req, res){
		Post.findById(req.params.id, (err, post)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: post,
				message: 'Single Post',
			});
		});
	}

	static deletePost(req, res){
		Post.findByIdAndDelete(req.params.id, (err, post)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: post,
				message: 'Successfully Deleted!',
			});
		});
	}

	static savePost(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are some errors with your data!',
			});
		}
		let post = new Post(req.body);
		post.save((err, post)=>{
			if(err) return error(err, res);
			return res.status(201).json({
				data: post,
				message: 'Successfully Saved Post',
			});
		});
	}

	static updatePost(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are Some errors with your data!',
			});
		}
		let post = new Post(req.body);
		post._id = req.params.id;

		Post.findByIdAndUpdate(req.params.id, post, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: updated,
				message: 'Successfully Updated Post!',
			});
		});
	}
}

module.exports = PostController;