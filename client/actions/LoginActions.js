/**
 * Login Actions
 * Used for google login 
 * Author: Kevin Ha
 */

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

// can delete
function requestGoogleLogin() {
    return {
        type: types.GOOGLE_LOGIN_REQUEST,
        isGoogleFetching: true,
        isLoggedIn: false,
    }
}
// can delete
function receiveGoogleLogin(json) {
    return {
        type: types.GOOGLE_LOGIN_SUCCESSFUL,
        isGoogleFetching: false,
        isLoggedIn: true,
        first_name: json.first_name,
        email: json.email,
    }
}
// can delete?
function loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
        isGoogleFetching: false,
        isLoggedIn: false,
        error: message,
    }
}

function loginUser(json) {
    return {
        type: types.LOGIN_USER_SUCCESSFUL,
        isLoggedIn: true,
        first_name: json.first_name,
        email: json.id,
    }
}

module.exports = {
    googleLogin: function googleLogin(data) {
        console.log(data);
        return dispatch => {
            return fetch(API.LOGIN, API.POST_CONFIG(data))
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(loginUser(json));
            })
            .catch(error => {
                // Catch google signup error
                return dispatch(loginError('Google login error ' + error));
            })    
        }
    }
}
    
