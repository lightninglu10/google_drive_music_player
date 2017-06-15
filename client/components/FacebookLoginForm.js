/**
 * Facebook Login Form
 * Facebook Login Authentication form
 * author: Kevin
 */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import FacebookLogin from 'react-facebook-login';
import { browserHistory } from 'react-router';

class FacebookLoginForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
           //handle facebook error
            facebookError: false, 
        }
    }
    
    handleClick = () => {
        alert('facebook login button clicked');
        event.preventDefault();
    }

    responseFacebook = (response) => {
        
        this.setState({
            facebookError: false,
        });
        console.log(response);
        this.props.loginFunction(response)
        .then((data) => {
            if (data.isLoggedIn) {
                //browserHistory.push('/');
            } else {
                alert('this is not working');
                this.setState({
                    facebookError: 'error signing up with facebook',
                });
            }
        });
    }

    render() {
        return(
            <div>
            <FacebookLogin
                appId={1160840187372674}
                language="en_US"
                scope="public_profile, email, user_birthday"
                auth_type="rerequest"
                callback={this.responseFacebook}
                version="v2.8"
                /> 
            </div>
         );
    }
}

const styles = StyleSheet.create({
    fbButton: {
        height: '50px',
        width: '400px',
        marginTop: '10px',
        borderRadius: '2px',
        border: '1px solid blue',
        backgroundColor: 'blue',
        color: 'white'
    },
});

export default FacebookLoginForm;
            
