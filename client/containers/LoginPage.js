/**
 * Login Page
 * Starting page of the app
 * author: Kevin Ha
 */

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Google Login Form
import GoogleLoginForm from '../components/GoogleLoginForm';

// Login Actions
import LoginActions from '../actions/LoginActions';


class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {


		}
	}
/*
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
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        })
    }

    updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            console.log('update status signed in');
            listFiles();
        } else {
            console.log('update status not signed in');
        } 
    }
*/

	render() {

        var {loginActions} = this.props;

        return (

            <div>
                <GoogleLoginForm loginFunction={loginActions} />

                {/*<Script
                    url="https://apis.google.com/js/api.js"
                    onError={this.start}
                    onLoad={this.start}
                />*/}

                {/*<button onClick={this.handleLoginClick}>login</button>*/}
                  
            </div>        

        );
    }
}

// Redux

function mapStateToProps(state) {
    return { 
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(LoginActions, dispatch),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
