/**
 * User Reducer
 * Author: Kevin Ha
 */

import types from '../config/action-types';

const initialState = {
	isLoggedIn: false,
	isGoogleFetching: false,
	username: '',
    email: '',
}

module.exports = function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.GOOGLE_LOGIN_REQUESTING:
        case types.GOOGLE_LOGIN_SUCCESSFUL:
        case types.LOGIN_FAILURE:
        return {
        	...state,
        	...action,
        }

        default:
        return state;
    }
}
