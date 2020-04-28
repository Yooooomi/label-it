const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(require('./routes/user'));
app.use(require('./routes/label'));
app.use(require('./routes/pin'));

module.exports = app;
