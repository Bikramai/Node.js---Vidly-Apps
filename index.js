require('express-async-errors');
const winston = require('winston');
require ('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth')
const express = require('express');
const app = express();

process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCOUGHT EXCEPTION');
    winston.error(ex.message, ex);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidlyapps',
    level: 'info'
 });

if (!config.get('jwtPrivateKey')) { // if you have Apps Vidly-Apps -> name it VidlyApp in config otherwise will not connect wit Database. I spent 2hrs to figure out.
    console.error('FATEL ERROR: jwtPrivate is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/Vidly-Apps')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth); 
app.use(error)



// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
