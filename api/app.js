const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', function (err) {
  console.error('failed to connect to mongodb');
  console.error('connection error:', err);
  process.exit(1);
});
db.once('connected', function () {
  console.log('DB Ready');
});

// Create link to React build directory
const distDir = path.join(__dirname, '/../client/build/');
const indexFile = path.join(distDir, '/index.html');

const indexRouter = require('./routes/index');

const app = express();

if (process.env.ENVIRONMENT === 'development') {
  app.use(cors());
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(distDir));

app.use('/api', indexRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(indexFile);
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.end("error")
// });

module.exports = app;
