var express  = require('express')
var router = express.Router();

var {body, check} = require('express-validator');
var controller = require('../../controllers/cPartners');

router.get('/:id', controller.getSinglePartner);

router.post('/:id', controller.updatePartner);

router.delete('/:id', controller.deletePartner);

router.get('/', controller.getAllPartners);

router.post('/', [
	body().trim().isLength({min:3}),

	check('*').escape(),
	controller.savePartner,
]);

module.exports = router;