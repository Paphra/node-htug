var express  = require('express')
var router = express.Router();

var {body, check} = require('express-validator');
var controller = require('../../controllers/cUsers');

router.get('/:id', controller.getSingleUser);

router.post('/:id', controller.updateUser);

router.delete('/:id', controller.deleteUser);

router.get('/', controller.getAllUsers);

router.post('/', [
	body().trim().isLength({min:3}),

	check('*').escape(),
	controller.saveUser,
]);

module.exports = router;