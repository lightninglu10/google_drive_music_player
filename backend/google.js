/**
 * Google App Configuration
 * Sets properties of google app
 * Author: Kevin Ha
 */

var env = require('./env');
const GOOGLE_CLIENT_ID = env === 'development' ? '530735327961-7d2g6lfuij1q60f9ig0a73k6cah56mld.apps.googleusercontent.com' : '';
const GOOGLE_SECRET = env === 'development' ? 'ZpAzCWErYODr2k2DfkIey3LV' : '';
const GOOGLE_APIKEY = env === 'development' ? 'AIzaSyDGB0jHjLLp-mWXrXEX9AaaviklFDbQyRk' : '';

module.exports = {
	clientId : GOOGLE_CLIENT_ID,
	clientSecret : GOOGLE_SECRET, 
	apiKey: 'AIzaSyDGB0jHjLLp-mWXrXEX9AaaviklFDbQyRk',
	scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
	discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
}

