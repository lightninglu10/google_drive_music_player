/**
 * Song Reducer
 * author: Kevin Ha
 */

import types from '../config/action-types';

const initialState = {
    name: '',
    file_address: '',
    selected: false,
}

module.exports = function songReducer(state = initialState, action) {
    switch(action.type) {
        case types.SONG_SELECT_SUCCESSFUL:
            return  {
                ...state,
                ...action,
            }
       
       default:
            return state;
    }
}
