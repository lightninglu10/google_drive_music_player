var express = require('express');
var router = express.Router();
var secureCookies = false; // we only secure them for production so we can test without https
var env      = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

var passport = require('./passportConfig');

var Playlist = require('./playlist');

router.get('/playlist', function(req, res, next) {

    Playlist.getAllSongs().then(songsArray => {
        return res.status(200).json(songsArray);
    });

});

router.post('/login/google/token', function(req, res, next) {
	console.log('SHALALALALALALA');
	passport.authenticate('google-token', function(err, user, info) {
	    if (err) { return res.status(400).json({error: 'oops: ' + err}); }
	    if (!user) { return res.status(400).json({error: 'Google login failed'}); }
	    req.logIn(user, function(err) {
	    	if (err) { return next(err); }
	      	console.log(user.serializeForSelf());
            return res.status(200).json(Object.assign({message: 'successful login'}, user.serializeForSelf()));
	    });
	})(req, res, next)
 });

router.use(function renderUnexpectedError (err, req, res, next) {
    res.status(500).json({error: 'Unexpected Error'});
    next(err);
});

module.exports = router;
