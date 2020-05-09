var express  = require('express')
var router = express.Router();

var {body, check} = require('express-validator');
var controller = require('../../controllers/cQuestions');

router.get('/:id', controller.getSingleQuestion);

router.post('/:id', controller.updateQuestion);

router.delete('/:id', controller.deleteQuestion);

router.get('/', controller.getAllQuestions);

router.post('/', [
	body().trim().isLength({min:3}),

	check('*').escape(),
	controller.saveQuestion,
]);

module.exports = router;