/**
* Auth Page
* This is the authentication page for the app.
* author: @
*/

import React from 'react';
import FacebookLogin from 'react-facebook-login';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Aphrodite
import { StyleSheet, css } from 'aphrodite';

// LoginForm
import LoginForm from '../components/LoginForm';
// SignUpForm
import SignUpForm from '../components/SignUpForm';
//FacebookLoginForm
import FacebookLoginForm from '../components/FacebookLoginForm';

// LoginActions
import LoginActions from '../actions/LoginActions';
// SignUpActions
import SignUpActions from '../actions/SignUpActions';
// LogOutActions
import LogOutActions from '../actions/LogOutActions';
//FacebookLoginActions
import FacebookLoginActions from '../actions/FacebookLoginActions';

// Stylesheets .scss is like .css but it has built in scoping
import '../stylesheets/containers/AuthPage.scss';

class AuthPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            //signup form
            isSigningUp: false,
        }
    }

    componentDidMount() {
        // If you want to do anything when this element first renders, do it here
        // See lifecycle methods: https://facebook.github.io/react/docs/react-component.html
        var { loginActions, signUpActions, logOutActions } = this.props;
        loginActions.getLogin();
    }


    handleSignUpButtonPress = () => {
        this.setState({
            isSigningUp: true,
        })
    }

    cancelSignUp = () => {
        this.setState({
            isSigningUp: false,
        })
    }

    logOut = () => {
        this.props.logOutActions.logOut();       
    }

    render() {
        // This is where you place your HTML. Inside of here goes components and other HTML elements

        // this.props is a dictionary, so var { loginActions } is the same thing as var loginActions = this.props['loginActions'];
        var { user, loginActions, signUpActions, facebookLoginActions } = this.props;
        return (
            <div>    
            <div className={css(styles.container)}>
                <div className="login">
                    <span className={css(styles.login)}>
                        Login Page
                    </span>
                    <FacebookLoginForm loginFunction={facebookLoginActions.facebookLogin} user={user} />
                    <div className={css(styles.or)}>or</div>
                    <LoginForm loginFunction={loginActions.login} /> <br />
                </div>
                
                <div className="signup">
                <label className={css(styles.newAccountQ)} > Don't have an account? </label>
                    <button onClick={this.handleSignUpButtonPress} className={css(styles.newUserButton)}>
                        Sign Up
                    </button>
                    { this.state.isSigningUp && 
                        <div className={css(styles.inLine)}>
                            <button onClick={this.cancelSignUp} className={css(styles.newUserButton)}>
                                Cancel
                            </button>
                            <br /><SignUpForm signUpFunction={signUpActions.signup} cancelSignUp={this.cancelSignUp}/>
                    
                        </div>
                    }
                <br />
                </div>
                </div>
                <div>
                { user.isLoggedIn ? (
                    <div className="loggedin">
                        <div>
                        User is logged in <br />
                        Username: {user.username} <br />
                        Email: {user.email} <br />
                        </div>
                    
                        <div className="logoutbutton">
                            <button onClick={this.logOut}>
                                Log Out
                            </button>
                        </div>
                    </div>
                    )
                    : 'User is not logged in'
                }
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        font: '24px Verdana'
    },
    container: {
        textAlign: 'center',
        width: '450px',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%);',
        border: '1px solid gray',
        borderRadius: '2px',
    },
    newAccountQ: {
        font: '14px Lucida Grande',
        height: '30px',
        marginRight: '20px'
    },
    newUserButton: {
        color: 'red',
        height: '30px',
        width: '70px',
        marginRight: '20px',
        border: '1px solid red',
        borderRadius: '2px',
        backgroundColor: 'white'
    },
    inLine: {
        display: 'inline'
    },
    or: {
        font: '14px Lucida Grande',
        color: 'black',
        height: '34px',
        padding: '8px'
    },
            
});

/*****************
 * REDUX SECTION *
 *****************/

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(LoginActions, dispatch),
        signUpActions: bindActionCreators(SignUpActions, dispatch),
        logOutActions: bindActionCreators(LogOutActions, dispatch),
        facebookLoginActions: bindActionCreators(FacebookLoginActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
