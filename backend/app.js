var express = require('express');
var router = express.Router();
var secureCookies = false; // we only secure them for production so we can test without https
var env      = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

var passport = require('./passportConfig');

var Playlist = require('./playlist');
var GoogleUser = require('./googleUser');

router.get('/playlist', function(req, res, next) {
    Playlist.getAllSongs().then(songsArray => {
        return res.status(200).json(songsArray);
    });
});

router.get('/files', function(req, res, next) {
    if(req.cookies.token){
        req.headers.authorization = 'Bearer ' + _.trim(req.cookies.token, '\"');
        console.log('token was added');
    }
    console.log(req);
});

router.post('/register', function(req, res, next) {
    GoogleUser.create(req.body).then(newUser => {
        console.log('inside new app ' + JSON.stringify(newUser));
        res.status(200).json(newUser.serializeForSelf());
    }).catch(err => {
        res.status(400).json({error: err.message});
    });
});

/*router.post('/login', function(req, res, next) {
	console.log('inside post');
    // Post the information for the login 
    passport.authenticate('custom', function(err, user, info) {
    	console.log('inside authentication');
        if (err) { return res.status(400).json({error: 'oops: ' + err}); }
        if (!user) { return res.status(400).json({error: info.message}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            console.log(user.serializeForSelf());
            return res.status(200).json(Object.assign({message: 'successful login'}, user.serializeForSelf()));
        });
    })(req, res, next)
});*/

router.post('/login/google/token', function(req, res, next) {
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
