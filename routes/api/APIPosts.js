var express  = require('express')
var router = express.Router();

var {body, check} = require('express-validator');
var controller = require('../../controllers/cPosts');

router.get('/:id', controller.getSinglePost);

router.post('/:id', controller.updatePost);

router.delete('/:id', controller.deletePost);

router.get('/', controller.getAllPosts);

router.post('/', [
	body().trim().isLength({min:3}),

	check('*').escape(),
	controller.savePost,
]);

module.exports = router;