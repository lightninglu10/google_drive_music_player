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
        accessToken: json.access_token,
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

function userRegistered(json) {
    return {
        type: types.REGISTER_USER_SUCCESSFUL,
        isLoggedIn: true,
        first_name: json.first_name,
        email: json.id,
    }
}

module.exports = {
    registerUser: function registerUser(data) {
        console.log(data);
        return dispatch => {
            return fetch(API.REGISTER, API.POST_CONFIG(data))
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                console.log('inside repeat');
                return dispatch(userRegistered(json));
            })
            .catch(error => {
                // Catch google signup error
                return dispatch(loginError('Google login error ' + error));
            })    
        }
    },
    /*googleLogin: function googleLogin(response) {
        console.log(response);
        var data = {'access_token': response.accessToken}
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
    }  */
}
    
