/**
* user reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    isLoggedIn: false,
    isFacebookFetching: false,
    email: '',
}

module.exports = function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_SUCCESSFUL:
        case types.FACEBOOK_LOGIN_REQUEST:
        case types.FACEBOOK_LOGIN_SUCCESSFUL:
        return {
            ...state,
            ...action,
        }
        case types.LOGOUT_SUCCESSFUL:
        return {initialState}

        default:
        return state;
    }
}
