const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) { // if you have Apps Vidly-Apps -> name it VidlyApp in config otherwise will not connect wit Database. I spent 2hrs to figure out.
        throw new Error('FATEL ERROR: jwtPrivate is not defined.');
    }
}