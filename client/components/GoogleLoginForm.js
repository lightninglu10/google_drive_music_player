/**
 * Google Login Form
 * Authentication form for google to access google drive
 * author: Kevin Ha
 */

import React from 'react';

// Google login npm package
import GoogleLogin from 'react-google-login';

class GoogleLoginForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {


		}
	}

	responseGoogle = (response) => {
		this.props.loginFunction.googleLogin(response)
		.then((data) => {
			if(data.isLoggedIn) {
				console.log('data is logged in!!!!');
			} else {
				console.log('data is not logging !!!!');
			}
		});
	}

	render() {
		return(
			<div>
			<div>Google login component</div>
			<div>
			<GoogleLogin
				clientId="530735327961-7d2g6lfuij1q60f9ig0a73k6cah56mld.apps.googleusercontent.com"
				onSuccess={this.responseGoogle}
				onFailure={this.responseGoogle}
			/>
			</div></div>

		);
	}
}

export default GoogleLoginForm;