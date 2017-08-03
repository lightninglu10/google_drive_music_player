/** 
 * Playlist Reducer
 * author: Kevin Ha
 */

import types from '../config/action-types';

var _ = require('lodash');

const initialState = {
    songs: [],
    playlistSongs: [],
    queue: [],
    playlists: [],
}

module.exports = function playlistReducer(state = initialState, action) {
    switch(action.type) {
        case types.GET_LOCAL_SONGS_SUCCESSFUL:
        case types.GET_PLAYLISTS_SUCCESSFUL:
        case types.GET_PLAYLIST_SONGS_SUCCESSFUL:
        case types.ADD_TO_PLAYLIST_SUCCESSFUL:
            return {
                ...state,
                ...action,
            }
        case types.ADD_LOCAL_SONG_SUCCESSFUL:
            return {
                ...state,
                songs: [...state.songs, action.songs],
            }
        case types.DELETE_LOCAL_SONG_SUCCESSFUL:
            return {
                ...state,
                songs: state.songs.filter(song => action.id !== song.id)
            }
        case types.ORDER_LOCAL_BY_NAME_SUCCESSFUL:
            return {
                ...state,
                songs: _.orderBy(state.songs, ['name'], [action.orderDir])
            }
        case types.ORDER_LOCAL_BY_TIME_SUCCESSFUL:
            return {
                ...state,
                songs: _.orderBy(state.songs, ['created_at'], [action.orderDir])
            }
        case types.ADD_TO_QUEUE_SUCCESSFUL:
            return {
                ...state,
                queue: [...state.queue, action.queue],
            }
        case types.REARRANGE_QUEUE_SUCCESSFUL:
            return {
                ...state,
                queue: state.queue.filter(song => action.id !== song.id)
            }
        case types.CREATE_NEW_PLAYLIST_SUCCESSFUL:
            return {
                ...state,
                playlists: [...state.playlists, action.playlists],
            }
        case types.DELETE_FROM_PLAYLIST_SUCCESSFUL:
            return {
                ...state,
                playlistSongs: state.playlistSongs.filter(song => action.id !== song.id)
            }
        case types.ORDER_CUSTOM_BY_NAME_SUCCESSFUL:
            return {
                ...state,
                playlistSongs: _.orderBy(state.playlistSongs, ['name'], [action.orderDir])
            }
        case types.CLEARPLAYLISTSONGS: 
            return {
                ...state, 
                playlistSongs: []
            }
        default:
            return state;
    }
}
