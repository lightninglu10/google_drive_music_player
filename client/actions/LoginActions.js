/**
 * Login Actions
 * Used for google login 
 * Author: Kevin Ha
 */

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

function registerUserSuccessful(json) {
    return {
        type: types.REGISTER_USER_SUCCESSFUL,
        isLoggedIn: true,
        first_name: json.first_name,
        email: json.email,
        id: json.id,
    }
}

function setLoggingOutState(state) {
    // if true
    if (state) {
        return {
            type: types.LOGOUT_USER_SUCCESSFUL,
        }
    } else {
        return {
            type: types.LOGIN_USER_SUCCESSFUL,
            isLoggedIn: true,
            isLoggingOut: false,
        }
    }
}

function caughtError(error) {
    return {
        type: types.CAUGHT_ERROR_SUCCESSFUL,
        error: error,
    }
}

module.exports = {
    // Register user into database
    registerUser: function registerUser(attr) {
        return dispatch => {
            return fetch(API.REGISTER, API.POST_CONFIG(attr))
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(registerUserSuccessful(json));
            })
            .catch(error => {
                return dispatch(caughtError(error));
            })    
        }
    },
    loggingInUser: function loggingInUser() {
        return dispatch => {
            return dispatch(setLoggingOutState(false));
        }
    },
    loggingOutUser: function loggingOutUser() {
        return dispatch => {
            return dispatch(setLoggingOutState(true));
        }
    },
}
    
