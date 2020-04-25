
'use strict';

//dependencies
const app = require('./app/application');
const winston = require('./app/config/winston');


const PORT = process.env.PORT || 8080;

//lift up application server
app
  .listen(PORT, function () {
    winston
    .debug(`Application server listening on port ${PORT} in ${process.env.NODE_ENV} environment`);

    winston.debug(`To see your app, visit 127.0.0.1:${PORT}`);
  })
  .on('error', function (error) {
    winston.error(error);
  });