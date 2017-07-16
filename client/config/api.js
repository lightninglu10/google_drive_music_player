/**
* Module define all API paths
* author: @
*/

const PRODUCTION_SITE = process.env.APP_ENV === 'production' ? '' : '';
const LOCALHOST = 'localhost:3000';

const BASE_URL = process.env.NODE_ENV === 'production' ? ('https://' + PRODUCTION_SITE + '/api/') : ('http://' + LOCALHOST + '/api/');
const GOOGLE_URL = 'https://www.googleapis.com/drive/v3/'

module.exports = {
    PRODUCTION_SITE: PRODUCTION_SITE,
    // URLs
    PLAYLIST: BASE_URL + 'playlist/',
    GOOGLE: BASE_URL + 'login/google/token/',
    REGISTER: BASE_URL + 'register/',
    FILES: GOOGLE_URL + 'files/',
    GET_CONFIG: {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    },
    POST_CONFIG: function POST_CONFIG(data) {
        return ({
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    PUT_CONFIG: function PUT_CONFIG(data) {
        return ({
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    },
    /*GET_FILES_CONFIG: function GET_FILES_CONFIG(data) {
        return ({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data, 
                'Host': 'content.google.apis',
            },
            body: {
                'pageSize': '10',
                'fields': "nextPageToken, files(id, name, webContentLink)",
                'q': "mimeType='audio/mpeg'",
            }
        })
    }*/
}
