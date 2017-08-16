/**
 * Google Drive Playlist
 * Gets songs from google drive 
 * Author: Kevin Ha
 */

import React from 'react';

// Bootstrap
import { DropdownButton, MenuItem, Table, thead, tr, th, tbody, FormGroup, FormControl, Button, Form } from 'react-bootstrap';

class GoogleDrivePlaylist extends React.Component {
	
	constructor(props) {
        super(props);

        this.state = {
            songList: [], 
            nextPageToken: '',
            pageTokenList: [''],
            maxPage: 1,
            currPage: 1,
            searchWord: '',
        }
	}

    // List files if user is logged in
	componentDidMount() {
		if(window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
			this.listFiles();
		}
	}

    // List files 10 at a time
	listFiles = () => {
		gapi.client.drive.files.list({
			pageSize: 10,
			fields: "nextPageToken, files(id, name, webContentLink)",
            orderBy: "name, createdTime",
			q: "mimeType='audio/mpeg' and name contains '" + this.state.searchWord + "'",
            pageToken: this.state.pageTokenList[this.state.currPage - 1],
		}).then((response) => { 
            this.setState({
                songList: response.result.files,
                nextPageToken: response.result.nextPageToken,
            })
		})
	}

    // Handle song click
    handleSongClick = (googleSong) => {
        // Song json data from Google has different name for url attribute
        var song = {
            id: googleSong.id,
            name: googleSong.name,
            url: googleSong.webContentLink
        }
        var attr = {
                songLocation: "google",
                song: song,
                prevSong: (({ id, currentSong, currentSongUrl }) => ({ id, currentSong, currentSongUrl }))(this.props.song),
                prevSongIndex: 0,
            }
        this.props.playlistActions.selectSong(attr);
    }

    // Handle prev button click
    handlePrevClick = (event) => {
        // Past the first page 
        if (this.state.currPage > 1) {
            this.setState({
                currPage: this.state.currPage - 1,
            },
            this.listFiles
            );
        } // Else if ur on the first page do nothing
    }

    // Handle next button click
    handleNextClick = (event) => {
        // If next page is a new page not accessed before
        if (this.state.currPage+1 > this.state.maxPage) {
            this.setState({
                currPage: this.state.currPage + 1,
                maxPage: this.state.maxPage + 1,
                pageTokenList: this.state.pageTokenList.concat([this.state.nextPageToken]),
            }, 
            this.listFiles
            );
        } else { // Page token is already in pageTokenList
            this.setState({
                currPage: this.state.currPage + 1,
            },
            this.listFiles
            );
        } 
    }

    handleSearchClick = (event) => {
        this.listFiles();
    }

    handleSearchChange = (event) => {
        this.setState({searchWord: event.target.value});
    }

    // Add song to local playlist
    handleAddClick = (song) => {
        var attr = {
            name: song.name,
            url: song.webContentLink,
            user_id: this.props.user.id,
        }
        this.props.playlistActions.addLocalSong(attr);
    }

	render() {
		return(
			<div>
                <h4>Google Drive Playlist:</h4>

                <Form inline>
                <FormGroup controlId="formBasicText">
                    <FormControl type="text" value={this.state.searchWord} placeholder="Search for song here" onChange={this.handleSearchChange} />
                    <Button onClick={this.handleSearchClick}>Search</Button>
                </FormGroup>
                </Form>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            this.state.songList.map((song) => {
                                return (
                                    <tr key={song.id}>
                                        <td>
                                            <DropdownButton title="-" noCaret id="songOptions" bsSize="xsmall">
                                                <MenuItem onClick={() => this.handleAddClick(song)}>Add to local playlist</MenuItem>
                                            </DropdownButton>
                                        </td>
                                        <td value={song} onClick={() => {this.handleSongClick(song)}}>{song.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <Button onClick={this.handlePrevClick}>Previous</Button>
                <Button onClick={this.handleNextClick}>Next</Button>
            </div>
		);
	}
}

export default GoogleDrivePlaylist;