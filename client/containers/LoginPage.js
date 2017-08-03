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
	}

	render() {
        var {loginActions, user} = this.props;

        return (
            <div>
                <GoogleLoginForm loginActions={loginActions} user={user} />   
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
