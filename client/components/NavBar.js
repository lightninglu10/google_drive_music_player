/**
* NavBar
* Navigation bar at the top of the page
* author: Kevin Ha
*/

import React from 'react';

// Styling
import { Navbar, FormControl, Nav, NavDropdown, MenuItem, Button } from 'react-bootstrap';

import { browserHistory } from 'react-router';

class NavBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			query: "",
		}
	}

	 // Handle log out button
    handleLogOutClick = (event) => {
        this.props.loginActions.loggingOutUser();
        gapi.auth2.getAuthInstance().signOut().then(() => {
            browserHistory.push('/Login');
        });
    }

    // Search bar handle text change
    handleChange = (event) => {
 		this.setState({query: event.target.value});
 	}

    // Search bar handle search
 	handleSearch = (query) => {
 		alert('Search for ' + query);
 	}

	render() {
		var { user } = this.props;
        var title = '' + user.first_name; // Circumvent NavDropdown title error when user is undefined

		return(
			<Navbar inverse fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a>Google Drive Music Player</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {/*<Navbar.Form pullLeft>
                        <FormControl type="text" placeholder="Search for Local Songs" onChange={this.handleChange}/>
                        {' '}
                        <Button onClick={() => {this.handleSearch(this.state.query)}}>Search</Button>
                    </Navbar.Form>*/}
                    <Nav pullRight>
                        <NavDropdown eventKey={1} title={title} id="user-nav-dropdown">
                            <MenuItem eventKey={1.1} disabled>Profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem onClick={this.handleLogOutClick}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
		);
	}
}

export default NavBar;