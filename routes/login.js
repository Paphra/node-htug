var express = require('express');
var { body, check, validationResult } = require('express-validator');
var sha1 = require('sha1');

var User = require('../models/User');
var checkuser = require('./checkuser');

module.exports = (app = express()) => {

  // login
  app.get('/login', (req, res, next) => {
    res.render(
      'login',
      {
        title: 'Login Inventory'
      }
    );
  })
  // post login
  app.post('/login', [
    body('username', 'Username Must not Be Empty!').trim()
      .isLength({ min: 1 }),
    body('password', 'Password Must not Be Empty!').trim()
      .isLength({ min: 1 }),
    check('*').escape(),
    (req, res, next) => {
      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render(
          'login',
          {
            title: 'Login | Invenotry',
            errors: errors.array()
          }
        );
      } else {
        let username = req.body.username;
        let password = sha1(req.body.password);
        //User.findOne({'username': username})
        //*
        User.findOne({
          $and: [
            {$or: [
                { 'username': username, 'password': password },
                { 'email': username, 'password': password }
            ]},
            {$or: [
              {'status': 'Active'},
              {'status': null}
            ]}
          ]
        }) // */
        .populate('branch')
          .exec((err, user) => {
            if (err) return next(err);
            if (user != null) {
              user.logged = true;
              user.login_time = Date.now();
              user.logout_time = null;
              user.updateOne(user, (err) => {
                if (err) return next(err);
                req.session.user = user;
                req.session.ps = sha1(user.password);
                let redir = req.session.return_to;
                if(redir === undefined){
                  redir = '/';
                }
                res.redirect(redir);
              });
            } else {
              res.render(
                'login',
                {
                  title: 'Login | Inventory',
                  errors: [{
                    msg: 'Invalid Username/Email or Password'
                  }]
                }
              );
            }
          });
      }
    }
  ]);

  // logout the user
  app.get('/logout', checkuser, (req, res, next) => {
    User.findById(req.session.user._id)
      .exec((err, user) => {
        if (err) return next(err);
        user.logged = false;
        user.logout_time = Date.now();
        user.updateOne(user, (err) => {
          if (err) return next(err);
          req.session.destroy((err) => {
            if (err) return next(err);
            res.redirect('/login');
          });
        });
      });
  });
}