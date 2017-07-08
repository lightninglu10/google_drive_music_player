/**
 * Playlist Actions
 * actions for playlist management
 * author: Kevin Ha
 */

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

function uploadSuccessful(songs) {
    return {
        type: types.SONG_UPLOAD_SUCCESSFUL,
        songs: songs,
    }
}

function songSelectSuccessful(song) {
    return { 
        type: types.SONG_SELECT_SUCCESSFUL,
        current_song: song.name,
        current_song_url: song.url,
    }
}

module.exports = {
    // Pulling songs from database
    getSongs: function getSongs() {
        return dispatch => {
            return fetch(API.PLAYLIST, API.GET_CONFIG)
            .then(Helpers.checkState)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(uploadSuccessful(json));
            })
            .catch((error) => {
                console.log('songs were not uploaded');
            });
        }
    },

    // Selecting song from playlist
    selectSong: function selectSong(song) {
        return dispatch => {
            return dispatch(songSelectSuccessful(song));
        }
    }

}         

