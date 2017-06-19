/** 
 * Playlist Reducer
 * author: Kevin Ha
 */

import types from '../config/action-types';

const initialState = {
    songs: [],
    current_song: {},
}

module.exports = function playlistReducer(state = initialState, action) {
    switch(action.type) {
        case types.SONG_UPLOAD_SUCCESSFUL:
        case types.SONG_SELECT_SUCCESSFUL:
            return {
                ...state,
                ...action,
            }

        default:
            return state;
    }
}
