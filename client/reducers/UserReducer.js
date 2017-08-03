/**
 * User Reducer
 * Author: Kevin Ha
 */

import types from '../config/action-types';

const initialState = {
	isLoggedIn: false,
    isLoggingOut: true,
    email: '',
    first_name: '',
    id: '',
}

module.exports = function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.REGISTER_USER_SUCCESSFUL:
        case types.LOGIN_USER_SUCCESSFUL:
        return {
        	...state,
        	...action,
        }
        case types.LOGOUT_USER_SUCCESSFUL:
        return {initialState}

        default:
        return state;
    }
}
