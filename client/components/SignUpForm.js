/**
 * SignUpForm
 * This is the sign up form for new users
 * author: Kevin Ha
 */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class SignUpForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    submitForm = (event) => {
        this.props.signUpFunction(this.state);
        this.props.cancelSignUp();
        event.preventDefault();
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return(
            
            <form onSubmit={this.submitForm}>
                <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email Address" className={css(styles.signupTextArea)}/>
                <br />
                <input type="text" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" className={css(styles.signupTextArea)} />
                <br />
                <input type="submit" value="Sign Up" className={css(styles.signupTextArea, styles.red)} />
            </form>    

        );
    }
}

const styles = StyleSheet.create({
    signupTextArea: {
        height: '50px',
        width: '400px',
        marginTop: '10px',
        borderRadius: '2px',
        border: '1px solid gray'
    },
    red: {
        backgroundColor: 'red',
        color: 'white'
    },
});

export default SignUpForm;
