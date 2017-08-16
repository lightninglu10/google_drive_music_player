/**
 * Tab Bar
 * Main tab bar that cycles through the shown playlists
 * Author: Kevin Ha
 */

 import React from 'react';

// Aphrodite
import { StyleSheet, css } from 'aphrodite';
 // Bootstrap
import { Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

 class TabBar extends React.Component {

 	constructor(props) {
 		super(props);

 		this.state = {
 			activeKey: "1",
 		}
 	}

 	// Select from dropdown button
    handleTabSelect = (event) => {
        // Highlight active tab
        this.setState({ activeKey: event });
        this.props.choosePlaylist(event);
    }

 	render() {
 		var { playlists, openDropdownModal, handleDropdownPlaylistClick } = this.props; 

		return(
			<Nav className={css(styles.padding)} bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
                <NavItem eventKey="1">Local</NavItem>
                <NavItem eventKey="2">Google Drive</NavItem>
                <NavItem eventKey="3">Queue</NavItem>
	            <NavDropdown eventKey="4" title="Playlists" id="playlists-dropdown">
	                <MenuItem eventKey="4.0" onClick={openDropdownModal}> Create new playlist</MenuItem>
					<MenuItem divider />
					{
						playlists.map((playlist) => {
							var varEventKey = "4." + playlist.id;
							return(
								<MenuItem eventKey={varEventKey} key={playlist.id} onClick={() => {handleDropdownPlaylistClick(playlist)}}>{playlist.name}</MenuItem>
							)
						})
					}
	            </NavDropdown>
		    </Nav>
		);
	}
}

const styles = StyleSheet.create({
    padding: {
        //paddingTop: '120px',
        //position: 'fixed',
    }
})

 export default TabBar;