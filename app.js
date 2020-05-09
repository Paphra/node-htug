var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');

var secret = Math.random() + '' + Math.random() + '' + Math.random();

// connection to mongoese
var dev_db_url = 'mongodb://localhost/ultimatesports';
var db_url = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', ()=>{
  console.log('Connected to the database.');
});

/** API Routes */
var apiSubscribers = require('./routes/api/APISubscribers');
var apiBooks = require('./routes/api/APIBooks');
var apiEvents = require('./routes/api/APIEvents');
var apiUsers = require('./routes/api/APIUsers');
var apiCategories = require('./routes/api/APICategories');
var apiPartners = require('./routes/api/APIPartners');
/** END API Routes */

/** WEB Routes */
var indexRouter = require('./routes/index');

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var subscribers = require('./routes/subscribers');

/** END WEB Routes */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'events_' + secret,
  resave: true,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

/** Register WEB routes */
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/subscribers', subscribers);

/** END Register Web routes */
/** Register API Routes */
app.use('/api/subscribers', apiSubscribers);
app.use('/api/users', apiUsers);
app.use('/api/events', apiEvents);
app.use('/api/partners', apiPartners);
app.use('/api/categories', apiCategories);
app.use('/api/books', apiBooks);
/** END Register API Routes */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
