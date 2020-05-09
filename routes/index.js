var express = require('express');
var router = express.Router();
var async = require('async');
var fetch = require('node-fetch');
var getHost = require('./ops/getHost');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  fetch(getHost(req) + '/api/subscribers')
    .then(res => res.json())
    .then(json => {
      let data = {
        title: 'Express',
        subscribers: json,

        navHome: true,
      }
      res.render('index', data);
    }).catch(reason=>console.log(reason));
});

module.exports = router;
