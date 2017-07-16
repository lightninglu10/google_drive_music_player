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
    },

    // Get songs from drive
    /*getGoogleSongs: function getGoogleSongs(token) {
        console.log('token in action is: ' + token);
        return dispatch => {
            return fetch(API.GOOGLE, {
                method: 'GET',
                //mode: 'cors',
                header: {
                    //'Access-Control-Allow-Origin': '*',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Credentials': 'true',
                    'Accept': 'application/json',
                    'credentials': 'same-origin',
                    //'Authorization': 'Bearer ' + token, 
                    //'Host': 'content.google.apis',
                },
                //body: {
                    //'pageSize': '10',
                    //'fields': "nextPageToken, files(id, name, webContentLink)",
                    //'q': "mimeType='audio/mpeg'",
                //}
            })
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                console.log('getGoogleSongs ' + json);
            })
            .catch((error) => {
                console.log('songs were not uploaded');
            });
        }
    },*/
}         

