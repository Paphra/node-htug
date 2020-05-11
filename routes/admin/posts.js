var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('async');

var getHost = require('../../ops/getHost');
var context = require('../../ops/context');

router.get('/:slug', (req, res)=>{

});

router.post('/:slug', (req, res)=>{

});

router.delete('/:slug', (req, res)=>{

});

router.get('/:id/comments', (req, res)=>{

});

router.post('/:id/comments', (req, res)=>{

});

router.get('/:id/comments/:comment_id', (req, res)=>{

});

router.post('/:id/comments/:comment_id', (req, res)=>{

});

router.delete('/:id/comments/:comment_id', (req, res)=>{

});

router.get('/', (req, res)=>{
	async.parallel({
		posts: callback=>{
			fetch(getHost(req) + '/api/posts').then(
				response=>response.json()).then(
					json=>callback(null, json)
				).catch(reason=>callback(reason, null));
		}
	}, (err, results)=>{
		if(err) next(err);
		
		let template = 'admin/posts/index';
		let data = {
			title: 'Posts',
			posts: results.posts.data,
			
			navAdmin: true,
			navAdminPosts: true,
		}

		context(data, req);
		res.render(template, data);
		
	});
});

router.post('/', (req, res)=>{

});

module.exports = router;