/**
* Login Form
* This is the login form for the app.
* author: @
*/

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        // binding submitFormFunction to this. this refers to our current class.
        this.submitFormFunction = this.submitFormFunction.bind(this);

        this.state = {
            email: '',
            password: '',
        }
    }
    
    submitForm = (event) => {
        // ES6 function. Sets variable submitForm as a function with event as the input. Autobinds to this (important).
        // Run this when the form gets submitted, prevent the default action

        this.props.loginFunction(this.state);
        this.setState({
            email: '',
            password: '',
        })
        event.preventDefault();
    }

    submitFormFunction(event) {
        // Javascript regular function definition, same function as above, but DOESN'T autobind to this. You need to bind it in constructor.
        // Run this when the form gets submitted, prevent the default action
        event.preventDefault();
    }

    //handle change of email input
    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
        event.preventDefault();
    }

    //handle change of password input
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
        event.preventDefault();
    }

    componentDidMount() {
        // If you want to do anything when this element first renders, do it here
        // See lifecycle methods: https://facebook.github.io/react/docs/react-component.html
    }

    render() {
        // This is where you place your HTML. Inside of here goes components and other HTML elements
        return (
            <form onSubmit={this.submitForm}>
                   <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email Address" className={css(styles.loginTextArea)} /> 
                   <br />
                   <input type="text" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" className={css(styles.loginTextArea)} />
                   <br />
               <input type="submit" value="Submit" className={css(styles.loginTextArea, styles.red)} />

            </form>
        );
    }
}

const styles = StyleSheet.create({
    loginTextArea: {
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
export default LoginForm;
