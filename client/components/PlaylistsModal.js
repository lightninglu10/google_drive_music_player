/**
 * List of all playlists
 * Bootstrap modal component wrapper
 * Author: Kevin Ha
 */

 import React from 'react';

// Lodash 
 var _ = require('lodash');

 // Bootstrap
import { Modal, Button, ListGroup, ListGroupItem, Panel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

 class PlaylistsModal extends React.Component {

 	constructor(props) {
 		super(props);

 		this.state = {
 			panel: false,
 			playlistName: "",
 		}
 	}

 	// Handle form submit
 	submitForm = (event) => {
 		// Prevent page refresh on enter
 		event.preventDefault();
 	}

 	// Open new playlist form
 	openPanel = () => {
 		var panelState = this.state.panel;
 		this.setState({panel: !panelState});
 	}

 	handleChange = (event) => {
 		this.setState({playlistName: event.target.value});
 	}

 	// Create new playlist
 	handleCreatePlaylist = () => {
 		// Make new playlist
 		var attr = {
 			name: this.state.playlistName,
 			user_id: this.props.user.id,
 		}
 		// Add selected song to the playlist
 		this.props.playlistActions.createNewPlaylist(attr).then((json) => {
 			var attr2 = {
 				playlistId: json.playlists.id,
 				songId: this.props.clickedSong.id, 
 			}
 			this.props.playlistActions.addToPlaylist(attr2);
 		});

 		// Close panel and exit popup
 		this.setState({
 			panel: false,
 			playlistName: "",
 		})
 		this.props.onHide();
 	}

 	// Add selected song to playlist
 	handleModalPlaylistClick = (playlist) => {
 		var attr2 = {
 				playlistId: playlist.id,
 				songId: this.props.clickedSong.id,
 			}
 		this.props.playlistActions.addToPlaylist(attr2);
 		this.props.onHide();
 	}

 	// Validation for the new playlist name
 	getValidationState = (playlists) => {
    	var newName = this.state.playlistName;
    	var unique = _.filter(playlists, ['name', newName]);

    	// Name can't be empty and must be unique
    	if (newName.length > 0 && unique.length == 0) {return 'success'}
   	 	else {return 'error'}
  	}

 	render() {
 		var { playlists, show, onHide } = this.props;
 		return(
 			<div>
		 		<Modal show={show} onHide={onHide}>
		            <Modal.Header closeButton>
		                <Modal.Title id="add-playlist-modal">Add to playist</Modal.Title>
		            </Modal.Header>
		            <Modal.Body>
		                <ListGroup>
		                    <ListGroupItem onClick={this.openPanel}>New Playlist</ListGroupItem>
		                    <Panel collapsible expanded={this.state.panel}>
		                    	<FormGroup controlId="formBasicText" validationState={this.getValidationState(playlists)}>
		          					<FormControl type="text" placeholder="New Playlist" onChange={this.handleChange}/>
		          					<FormControl.Feedback />
	          						<HelpBlock>Create a unique playlist name</HelpBlock>
	          						<Button className="pull-right" onClick={this.handleCreatePlaylist}>Create</Button>
	          					</FormGroup>
	        				</Panel>
	        				{
	        					playlists.map((playlist) => {
	        						return(
	        							<ListGroupItem key={playlist.id} onClick={() => {this.handleModalPlaylistClick(playlist)}}>{playlist.name}</ListGroupItem>
	        						)
	        					})
	        				}
		                </ListGroup>
		            </Modal.Body>
		            <Modal.Footer>
		                <Button onClick={onHide}>Cancel</Button>
		            </Modal.Footer>
		        </Modal>

        	</div>
        );
	} 
}

 export default PlaylistsModal;