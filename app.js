var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var forceSsl = require('force-ssl-heroku');

var validate = require('./ops/validate');

var secret = Math.random() + '' + Math.random() + '' + Math.random();

// connection to mongoese
var dev_db_url = 'mongodb://localhost:27017/healthtorchug';
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
var apiQuestions = require('./routes/api/APIQuestions');
var apiPosts = require('./routes/api/APIPosts');
var apiUsers = require('./routes/api/APIUsers');
var apiCategories = require('./routes/api/APICategories');
var apiPartners = require('./routes/api/APIPartners');
/** END API Routes */

/** WEB Routes */
var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var questionsRouter = require('./routes/questions');
var aboutRouter = require('./routes/about');
var profileRouter = require('./routes/profile');

// admin routes
var adminRouter = require('./routes/admin/index');
var usersRouter = require('./routes/admin/users');
var categoriesRouter = require('./routes/admin/categories');
var partnersRouter = require('./routes/admin/partners');
var adminPostsRouter = require('./routes/admin/posts');
var adminQuestionsRouter = require('./routes/admin/questions');
var adminAboutRouter = require('./routes/admin/about');
var adminProfileRouter = require('./routes/admin/profile');
/** END WEB Routes */

var app = express();
var admin = express();
var api = express();

app.use(forceSsl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'healthtorchug_' + secret,
  resave: true,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

/** Register WEB routes */
app.use(validate);

// ordinary user interface
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/questions', questionsRouter);
app.use('/about', aboutRouter);
app.use('/profile', profileRouter);

// admin interface
app.use('/admin', admin)
admin.use('/', adminRouter);
admin.use('/posts', adminPostsRouter);
admin.use('/questions', adminQuestionsRouter);
admin.use('/users', usersRouter);
admin.use('/categories', categoriesRouter);
admin.use('/partners', partnersRouter);
admin.use('/about', adminAboutRouter);
admin.use('/profile', adminProfileRouter);
/** END Register Web routes */

/** Register API Routes */
app.use('/api', api)
api.use('/users', apiUsers);
api.use('/posts', apiPosts);
api.use('/partners', apiPartners);
api.use('/categories', apiCategories);
api.use('/questions', apiQuestions);
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
