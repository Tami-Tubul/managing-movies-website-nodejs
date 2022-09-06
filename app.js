var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//***********Routers locations************//
var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu')
var createMovieRouter = require('./routes/createMovie')
var searchMoviesRouter = require('./routes/searchMovies')
var movieDataRouter = require('./routes/movieData')
var usersManagementRouter = require('./routes/usersManagement')
var userDataRouter = require('./routes/userData')


var session = require("express-session")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:"mysecret"}))


//***********Routers views************//
app.use('/', loginRouter);
app.use('/menu',menuRouter);
app.use('/createMovie',createMovieRouter);
app.use('/searchMovies',searchMoviesRouter)
app.use('/movieData',movieDataRouter)
app.use('/usersManagement',usersManagementRouter)
app.use('/userData',userDataRouter)



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
