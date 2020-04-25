
'use strict';

//dependencies
const mkdir = require('mkdir-p');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressWinston = require('express-winston');
const cors = require('cors');
const createError = require('http-errors');
require('./scraper');

//build logs directory if does not exists
mkdir.sync('../logs');

//setup winston application logger
const winston = require('./config/winston');

// create an express application
const app = express();

// middleware to enable cors
app.use(cors({
    origin: true,
    allowedHeaders: ['Content-Type', 'x-xsrf_token'],
    credentials: true
}));

// middleware to parse text/plain request 
app.use(bodyParser.text());
// middleware to parse application/json request 
app.use(bodyParser.json());
// middleware to parse query string
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));


// app http request logger
app.use(expressWinston.logger({
    winstonInstance: winston
}));

// app errors pipeline logger
app.use(expressWinston.errorLogger({
    winstonInstance: winston
}));

// load all routers recursively
require('require-all')({
    dirname: __dirname,
    filter: /(.+_router)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/,
    resolve: function (router) {
        app.use('/', router);
    }
});

app.get('/', (req,res) => {
    const pkg = require('../package.json');
    res.json({
       name: pkg.name,
       version: pkg.version,
       status: 'up'
    });
});

// catch 404 and forward to error handler
app.use('/*', function (request, response, next) {
    const error = createError(404, 'Not Found');
    next(error);
});



/**
 * @callback errorHandlerCallback
 * error handlers
 * @param {Object} error - Error throwed 
 * @param {Object} req - Http request
 * @param {Object} res - Http response
 * @param {errorHandlerCallback} next - Callback never used in this function but it's important
 * to remain for expressjs to recognize this function as error middleware. 
 * Note:
 * If you remove the callback among function parameters then this function will never get executed
 * when an error is throwing. 
 */
function errorHandler(error, req, res, next) { //eslint-disable-line  no-unused-vars
    winston.error(error); // print error into console and error log
    const { message, statusCode, status } = error;
    res.status(statusCode || status || 500);
    res.json({ message });
}

// handle error
app.use(errorHandler);


//export express application
module.exports = app;

