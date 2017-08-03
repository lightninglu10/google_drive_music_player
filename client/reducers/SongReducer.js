/**
 * Song Reducer
 * author: Kevin Ha
 */

import types from '../config/action-types';

const initialState = {
    id: '',
    currentSong: '',
    currentSongUrl: '',
    songLocation: '',
    prevSong: {},
    prevSongIndex: 0,
    prevSongs: [],
}

module.exports = function songReducer(state = initialState, action) {
    switch(action.type) {
        /*case types.SELECT_PREV_SONG_SUCCESSFUL:
            return {
                ...state,
                ...action,
            }*/
        case types.SELECT_SONG_SUCCESSFUL:
            return  {
                ...state,
                ...action,
                prevSongs: [...state.prevSongs, action.prevSong],
            }
       default:
            return state;
    }
}
