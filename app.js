var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var pry = require('pryjs')
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersApiRouter = require('./routes/api/v1/users');
var sessionsApiRouter = require('./routes/api/v1/sessions');
var forecastApiRouter = require('./routes/api/v1/forecast');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/users', usersApiRouter);
app.use('/api/v1/sessions', sessionsApiRouter);
app.use('/api/v1/forecast', forecastApiRouter);

module.exports = app;
