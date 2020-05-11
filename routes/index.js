var express = require('express');
var router = express.Router();
var async = require('async');
var fetch = require('node-fetch');
var getHost = require('../ops/getHost');

var context = require('../ops/context');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  async.parallel({
    posts: callback => {
      fetch(getHost(req) + '/api/posts').then(
        res=>res.json()).then(json=>callback(null, json)
        ).catch(reason=>callback(reason, null));
      },
    questions: callback => {
      fetch(getHost(req) + '/api/questions').then(
        res=>res.json()).then(json=>callback(null, json)
        ).catch(reason=>callback(reason, null));
      }
      
  }, (err, results)=>{
    if (err) next(err);
    let template = 'index';
    let data = {
      title: 'Home',

      posts: results.posts.data.slice(0, 5),
      questions: results.questions.data.slice(0, 5),
      navHome: true,
    }

    context(data, req);
    res.render(template, data);
  });
});

module.exports = router;
