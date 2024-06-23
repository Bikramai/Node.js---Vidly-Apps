const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) { // if you have Apps Vidly-Apps -> name it VidlyApp in config otherwise will not connect wit Database. I spent 2hrs to figure out.
    console.error('FATEL ERROR: jwtPrivate is not defined.');
    process.exit(1);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
