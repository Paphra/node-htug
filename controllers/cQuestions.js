var {validationResult} = require('express-validator');
var Question = require('../models/Question');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class QuestionController{

	// get all questions
	static getAllQuestions(req, res){
		Question.find({}, (err, questions)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: questions,
				message: 'All Questions',
			});
		});
	}

	static getSingleQuestion(req, res){
		Question.findById(req.params.id, (err, question)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: question,
				message: 'Single Question',
			});
		});
	}

	static deleteQuestion(req, res){
		Question.findByIdAndDelete(req.params.id, (err, question)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: question,
				message: 'Successfully Deleted!',
			});
		});
	}

	static saveQuestion(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are some errors with your data!',
			});
		}
		let question = new Question(req.body);
		question.save((err, question)=>{
			if(err) return error(err, res);
			return res.status(201).json({
				data: question,
				message: 'Successfully Saved Question',
			});
		});
	}

	static updateQuestion(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are Some errors with your data!',
			});
		}
		let question = new Question(req.body);
		question._id = req.params.id;

		Question.findByIdAndUpdate(req.params.id, question, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: updated,
				message: 'Successfully Updated Question!',
			});
		});
	}
}

module.exports = QuestionController;