var express = require('express');
var router = express.Router();
var secureCookies = false; // we only secure them for production so we can test without https
var env      = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

var Playlist = require('./playlist');

var options = { 
    // Initialization Options
    promiseLib: Promise
};

/*var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/google_drive_music_player';
var db = pgp(connectionString);*/

router.get('/playlist', function(req, res, next) {

    Playlist.getAllSongs().then(songsArray => {
        return res.status(200).json(songsArray);
    });

});

module.exports = router;
