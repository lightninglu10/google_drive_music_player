/**
 * Login Actions
 * Used for google login 
 * Author: Kevin Ha
 */

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

function requestGoogleLogin() {
    return {
        type: types.GOOGLE_LOGIN_REQUEST,
        isGoogleFetching: true,
        isLoggedIn: false,
    }
}

function receiveGoogleLogin(json) {
    return {
        type: types.GOOGLE_LOGIN_SUCCESSFUL,
        isGoogleFetching: false,
        isLoggedIn: true,
        first_name: json.first_name,
        email: json.email,
    }
}

function loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
        isGoogleFetching: false,
        isLoggedIn: false,
        error: message,
    }
}

module.exports = {
    googleLogin: function googleLogin(response) {
        var data = {'access_token': response.access_token}
        return dispatch => {
            dispatch(requestGoogleLogin());
            return fetch(API.GOOGLE, API.POST_CONFIG(data))
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(receiveGoogleLogin(json));
            })
            .catch(error => {
                // catch google signup error
                return dispatch(loginError('Google login error ' + error));
            })    
        }
    }        
}
    
