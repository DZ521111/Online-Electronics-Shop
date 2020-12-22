const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');
const HttpError = require('http-errors');

// get the application
const app = express();

// set up logger
if (config.env === 'development') {
    app.use(logger('dev'));
}

// get the dist folder
const distDir = path.join(__dirname, '../../dist');

// use the distDir as hosting folder by express
app.use(express.static(distDir));

// parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure app
app.use(helmet())

// allow cors
app.use(cors());

// authenticate
app.use(passport.initialize());


// api Routes
// path localhost:4040/api
app.use("/api/", routes);

// serve the index.html file
app.get("*", (req, res, next) => {
    res.sendFile(path.join(distDir, "index.html"))
});

// exception for 404 error handler
app.use((req, res, next) => {
  const error = new HttpError(404);
  return next(error);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});


module.exports = app;
