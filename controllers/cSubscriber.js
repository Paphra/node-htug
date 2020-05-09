
var {validationResult} = require('express-validator');

var Subscriber = require('../models/Subscriber');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Somthing went wrong!',
	});
}

class SubscriberController {
	// get all subscribers
	static getAllSubscribers(req, res){
		Subscriber.find({}, (err, subscribers)=>{
			if(err) return error(err, res); 
			return res.status(200).json({
				data: subscribers,
				message: 'All Subscribers',
			});
		});
	}

	// get single subscriber
	static getSingleSubscriber(req, res){
		Subscriber.findById(req.params.id, (err, subscriber)=>{
			if(err) return error(err, res);
			if(subscriber){
				return res.status(200).json({
					data: subscriber,
					message: 'A Single Subscriber record',
				})
			}
			return res.status(404).json({
				message: 'Subscriber not found! Might have been Deleted.'
			});
		});
	}

	// Save a subscriber
	static saveSubscriber(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'Some Errors are found in your data'
			});
		}
		let subscriber = new Subscriber(req.body);
		Subscriber.findOne({'email': subscriber.email}, (err, found)=>{
			if(err) return error(err, res);
			if(found){
				return res.status(200).json({
					data: found,
					message: 'Already Subscribed!',
				})
			}
			subscriber.save((err, saved)=>{
				if(err) return error(err, res);
				return res.status(201).json({
					data: saved,
					message: 'Subscriber Saved!',
				});
			});
		});	
	}

	// Update subscriber
	static updateSubscriber(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				errors: errors.array(),
				data: req.body,
				message: 'Some errors are found in your data',
			})
		}
		Subscriber.findById(req.params.id, (err, subscriber)=>{
			if(err) return error(err, res);
			if(subscriber){
				subscriber.fullName = req.body.fullName,
				subscriber.email = req.body.email,
				subscriber.active = req.body.active,
				subscriber.save(
					(err, updated)=>{
					if(err) return error(err, res);
					return res.status(200).json({
						data: updated,
						message: 'Subscriber Updated',
					});
				});
			}else{
				return res.status(404).json({
					message: 'Subscriber Not found',
				});
			}
		});
	}
}

module.exports = SubscriberController;