var express  = require('express')
var router = express.Router();

var {body, check} = require('express-validator');
var controller = require('../../controllers/cCategories');

router.get('/:id', controller.getSingleCategory);

router.post('/:id', controller.updateCategory);

router.delete('/:id', controller.deleteCategory);

router.get('/', controller.getAllCategories);

router.post('/', [
	body().trim().isLength({min:3}),

	check('*').escape(),
	controller.saveCategory,
]);

module.exports = router;