/**
 * Log Out Actions
 * author: Kevin
 */

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

function logOutSuccessful() {
    return {
        type: types.LOGOUT_SUCCESSFUL,
    }
}

module.exports = {
    logOut: function logOut() {
        return dispatch => {
            return fetch(API.LOGOUT, API.POST_CONFIG())
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(logOutSuccessful());
            })
            .catch((error) => {
                error.response.json().then((error) => {alert('not logging out because: ' + JSON.stringify(error))});
            });
        }
    }
}
