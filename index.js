require('express-async-errors');
const winston = require('winston');
require ('winston-mongodb');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/routes')(app);

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncoghtExceptions.log'}))


process.on('unhandleRejection', (ex) => {
    throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidlyapps',
    level: 'info'
 });

 const p = Promise.reject(new Error('Something failed misserably!'));
 p.then(() => console.log('Done'));

if (!config.get('jwtPrivateKey')) { // if you have Apps Vidly-Apps -> name it VidlyApp in config otherwise will not connect wit Database. I spent 2hrs to figure out.
    console.error('FATEL ERROR: jwtPrivate is not defined.');
    process.exit(1);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
