var {validationResult} = require('express-validator');
var User = require('../models/User');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class UserController{

	// get all users
	static getAllUsers(req, res){
		User.find({}, (err, users)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: users,
				message: 'All Users',
			});
		});
	}

	static getSingleUser(req, res){
		User.findById(req.params.id, (err, user)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: user,
				message: 'Single User',
			});
		});
	}

	static deleteUser(req, res){
		User.findByIdAndDelete(req.params.id, (err, user)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: user,
				message: 'Successfully Deleted!',
			});
		});
	}

	static saveUser(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are some errors with your data!',
			});
		}
		let user = new User(req.body);
		user.save((err, user)=>{
			if(err) return error(err, res);
			return res.status(201).json({
				data: user,
				message: 'Successfully Saved User',
			});
		});
	}

	static updateUser(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are Some errors with your data!',
			});
		}
		let user = new User(req.body);
		user._id = req.params.id;

		User.findByIdAndUpdate(req.params.id, user, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: updated,
				message: 'Successfully Updated User!',
			});
		});
	}
}

module.exports = UserController;