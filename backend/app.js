var express = require('express');
var router = express.Router();
var secureCookies = false; // we only secure them for production so we can test without https
var env      = require('./env');
var Promise = require('bluebird');

var playlist = require('./playlist');

var options = { 
    // Initialization Options
    promiseLib: Promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/google_drive_music_player';
var db = pgp(connectionString);

router.get('/playlist', function(req, res, next) {
    // Get the playlist
    //console.log(req.playlist.serializeForSelf());
    //return res.status(200).json(req.playlist.serializeForSelf());
    
    db.any('select * from audio_files')
    .then(function (data) {
        res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Retrived all songs'
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

module.exports = router;
