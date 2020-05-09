var express = require('express');
var router = express.Router()
var {body, check} = require('express-validator');

var controller = require('../../controllers/cSubscriber');


router.get('/:id', controller.getSingleSubscriber);
router.post('/:id', [
	body('fullName', 'Full Name must be at least 3 characters').trim().isLength({min: 3}),
	body('email', 'Email must be at least 5 characters').trim().isLength({min: 5}),
	check('*').escape(),
	controller.updateSubscriber,
]);

router.get('/', controller.getAllSubscribers);
router.post('/',[
	body('fullName', 'Full Name must be at least 3 characters').trim().isLength({min: 3}),
	body('email', 'Email must be at least 5 characters').trim().isLength({min: 5}),
	check('*').escape(),
	controller.saveSubscriber
]);

module.exports = router;