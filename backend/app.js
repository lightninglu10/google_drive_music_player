var express = require('express');
var router = express.Router();
var secureCookies = false; // we only secure them for production so we can test without https
var env      = require('./env');
var Promise = require('bluebird');
var _ = require('lodash');

var Song = require('./song');
var User = require('./user');
var Playlist = require('./playlist');

router.post('/playlist/main', function(req, res, next) {
    Song.getAllSongs(req.body).then((songsArray) => {
        return res.status(200).json(songsArray);
    }).catch((err) => {
        res.status(400).json({error: 'getLocalSongs:' + err.message});
    });
});

router.post('/playlist/main/add', function(req, res, next) {
    Song.addSongToLocal(req.body).then((song) => {
        res.status(200).json(song);
    }).catch((err) => {
        res.status(400).json({error: 'addLocalSong: ' + err.message});
    });
});

router.post('/playlist/main/delete', function(req, res, next) {
    Song.deleteSongFromLocal(req.body).then(() => {
        res.status(200).json(Object.assign({message: 'deleted song from local playlist'}));
    }).catch((err) => {
        res.status(400).json({error: 'deleteLocalSong: ' + err.message});
    });
});

router.post('/playlist/user/:userId', function(req, res, next) {
    Playlist.getPlaylists(req.body).then((playlistsArray) => {
        return res.status(200).json(playlistsArray);
    }).catch((err) => {
        res.status(400).json({error: 'getPlaylists: ' + err.message});
    });
});

router.put('/playlist/:playlistName', function(req, res, next) {
    Playlist.create(req.body).then((playlist) => {
        res.status(200).json(playlist);
    }).catch((err) => {
        res.status(400).json({error: 'createNewPlaylist: ' + err.message});
    });
});

router.post('/playlist/:playlistId', function(req, res, next) {
    Playlist.getSongs(req.body).then((songsArray) => {
        res.status(200).json(songsArray);
    }).catch((err) => {
        res.status(400).json({error: 'getPlaylistSongs: ' + err.message});
    })
})

router.post('/playlist/:playlistId/add', function(req, res, next) {
    Playlist.addSong(req.body).then((json) => {
        res.status(200).json('Added song to playlist successfully');
    }).catch((err) => {
        res.status(400).json({error: 'addToPlaylist: ' + err.message});
    })
})

router.post('/playlist/:playlistId/delete', function(req, res, next) {
    Playlist.deleteSong(req.body).then((json) => {
        res.status(200).json('Deleted song from playlist successfully');
    }).catch((err) => {
        res.status(400).json({error: 'deleteFromPlaylist: ' + err.message});
    })
})

// Search and register user in database
router.post('/register', function(req, res, next) {
    // Look through database
    User.query({ where: {google_id: req.body.google_id}}).fetch().then((user) => {
        // If user is found in database
        if (user) {
            res.status(200).json(user.serializeForSelf());
        } else { // Else create new user
            User.create(req.body).then((newUser) => {
                res.status(200).json(newUser.serializeForSelf());
            }).catch((err) => {
                res.status(400).json({error: 'registerUser: ' + err.message});
            });
        }
    })
});

router.use(function renderUnexpectedError (err, req, res, next) {
    res.status(500).json({error: 'Unexpected Error'});
    next(err);
});

module.exports = router;
