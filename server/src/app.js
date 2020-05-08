const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser = require('body-parser');
const db = require('./db');

const app = express();

const cors = process.env.CORS;
const allcors = (cors || '').split(',');

app.use((req, res, next) => {
  const origin = req.get('origin');
  let set = false;
  if (cors === 'all') {
    res.header('Access-Control-Allow-Origin', origin);
    set = true;
  } else if (allcors.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    set = true;
  }
  if (set) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Authorization, '
      + 'x-id, Content-Length, X-Requested-With',
    );
    res.header('Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS');
  }
  return next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(require('./routes/user'));
app.use(require('./routes/label'));
app.use(require('./routes/pin'));
app.use(require('./routes/settings'));

async function startup() {
  try {
    const settings = await db.getGlobalSettings();
    if (!settings) {
      await db.createGlobalSettings();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

startup();

module.exports = app;
