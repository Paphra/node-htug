var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var getHost = require('./ops/getHost');
var handleFetchErrors = require('./ops/handleFetchErrors');

var ctxt =(ctxt)=>{
	ctxt.navSub = true;
}

// single subscriber 
router.get('/:id', (req, res)=>{
	fetch(getHost(req) + '/api/subscribers/' + req.params.id).then(
		res=>res.json()).then(json=>{
			let data = {
				title: 'Subscriber',
				subscriber: json,
			}
			ctxt(data);
			res.render('subscribe/subscriber', data);
		}).catch(reason=>{
			handleFetchErrors(res, reason, '/admin/subcribers');
		});
});

// update a subscriber
router.post('/:id', (req, res)=>{
	fetch(getHost(req) + '/api/subscribers/' + req.params.id, {
		method: 'post',
		body: JSON.stringify(req.body),
		headers: {'Content-Type': 'application/json'},
	}).then(res=>res.json()).then(json=>{
		let data = {
			title: 'Subscriber',
			subscriber: json,
		}
		ctxt(data);
		res.render('subscribe/subscriber', data);
	}).catch(reason=>{
		handleFetchErrors(res, reason, '/suabscribers/'+req.params.id);
	});
});

// all subscribers
router.get('/', (req, res)=>{
	fetch(getHost(req) + '/api/subscribers').then(
		res=>res.json()).then(json=>{
		let data = {
			title: 'Subscribers',
			subscribers: json,
		}
		ctxt(data);
		res.render('subscribe/subscribers', data);
	}).catch(reason=>{
		handleFetchErrors(res, reason, '/admin');
	});
});

// save a subscriber
router.post('/', (req, res)=>{

	fetch(getHost(req) + '/api/subscribers', {
		method: 'post',
		body: JSON.stringify(req.body),
		headers: {'Content-Type': 'application/json'}
	}).then(res => res.json())
	.then(json =>{
		let data ={
			title: 'Subscribing',
			subscriber: json,
		}
		ctxt(data);
		res.render('subscribe/index', data);
	}).catch(reason=>{
		handleFetchErrors(res, reason, '/');
	});

});


module.exports = router;