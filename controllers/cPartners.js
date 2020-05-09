var {validationResult} = require('express-validator');
var Partner = require('../models/Partner');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class PartnerController{

	// get all partners
	static getAllPartners(req, res){
		Partner.find({}, (err, partners)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: partners,
				message: 'All Partners',
			});
		});
	}

	static getSinglePartner(req, res){
		Partner.findById(req.params.id, (err, partner)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: partner,
				message: 'Single Partner',
			});
		});
	}

	static deletePartner(req, res){
		Partner.findByIdAndDelete(req.params.id, (err, partner)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: partner,
				message: 'Successfully Deleted!',
			});
		});
	}

	static savePartner(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are some errors with your data!',
			});
		}
		let partner = new Partner(req.body);
		partner.save((err, partner)=>{
			if(err) return error(err, res);
			return res.status(201).json({
				data: partner,
				message: 'Successfully Saved Partner',
			});
		});
	}

	static updatePartner(req, res){
		let errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({
				data: req.body,
				errors: errors.array(),
				message: 'There are Some errors with your data!',
			});
		}
		let partner = new Partner(req.body);
		partner._id = req.params.id;

		Partner.findByIdAndUpdate(req.params.id, partner, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json({
				data: updated,
				message: 'Successfully Updated Partner!',
			});
		});
	}
}

module.exports = PartnerController;