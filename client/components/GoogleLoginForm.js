/**
 * Google Login Form
 * Authentication form for google to access google drive
 * author: Kevin Ha
 */

import React from 'react';
import { browserHistory } from 'react-router';



// Google login npm package
import GoogleLogin from 'react-google-login';

class GoogleLoginForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {


		}
	}

	responseGoogle = (response) => {
		console.log(response);
		this.props.loginFunction.googleLogin(response)
		.then((data) => {
			if(data.isLoggedIn) {
				browserHistory.push('/Player');
			} else {
				console.log('data is not logging !!!!');
			}
		});
	}

	start = (event) => {
        gapi.load('client:auth2', this.initClient);
    }

    componentDidMount = () => {
        this.start();
    }


    handleLoginClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    }

    initClient = () => {
        console.log(window.gapi);
        window.gapi.client.init({
            apiKey: 'AIzaSyDGB0jHjLLp-mWXrXEX9AaaviklFDbQyRk',
            clientId: '530735327961-7d2g6lfuij1q60f9ig0a73k6cah56mld.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
        }).then(() => {
        	console.log('inside init');
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            gapi.auth2.getAuthInstance().currentUser.listen(this.updateUserStatus);

            console.log('inside init2');
        })
    }

    updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            console.log('update status signed in');
        } else {
            console.log('update status not signed in');
        } 
    }

    updateUserStatus = (isSignedIn) => {
    	if (isSignedIn) {
            console.log('updateUserStatus true');
            this.responseGoogle(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true));
        } else {
            console.log('updateUserStatus false');
        } 
    }

	render() {
		return(
			<div>
			{/*<GoogleLogin
				clientId="530735327961-7d2g6lfuij1q60f9ig0a73k6cah56mld.apps.googleusercontent.com"
				onSuccess={this.responseGoogle}
				onFailure={this.responseGoogle}
				scope="https://www.googleapis.com/auth/drive.readonly"
				discoveryDocs={["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}
			/>*/}

				<button onClick={this.handleLoginClick}>login</button>

			</div>

			
		);
	}
}

export default GoogleLoginForm;