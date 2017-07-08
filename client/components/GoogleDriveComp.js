/**
 * Google Drive Component
 * Provides ui for google drive 
 * Author: Kevin Ha
 */

import React from 'react';

class GoogleDriveComp extends React.Component {
	
	constructor(props) {
        super(props);

        this.state = {
            songList: [], 
            nextPageToken: '',
            pageTokenList: [''],
            maxPage: 1,
            currPage: 1
        }
	}

    // List files if user is logged in
	componentDidMount() {
        console.log(this.props.history);
		if(window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true));
			this.listFiles();
		}
	}

    // List files 10 at a time
	listFiles = () => {
		gapi.client.drive.files.list({
			pageSize: 10,
			fields: "nextPageToken, files(id, name, webContentLink)",
			q: "mimeType='audio/mpeg'",
            pageToken: this.state.pageTokenList[this.state.currPage - 1],
		}).then((response) => { // console.log(response.result) to see the format of response
            this.setState({
                songList: response.result.files,
                nextPageToken: response.result.nextPageToken,
            })
		})
	}

    // Handle song click
    handleSongClick = (song) => {
        this.props.selectSong({
            name: song.name,
            url: song.webContentLink,
        });
        console.log('Pressed song: ' + song.name);
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

	render() {
		return(
			<div>
                <ul>
                    Google Drive Playlist:
                    {
                        this.state.songList.map((song) => {
                            return <li key={song.id} value={song} onClick={() => this.handleSongClick(song)}>{song.name}</li>
                        })
                    }
                </ul>

                <button onClick={this.handlePrevClick}>Previous</button>
                <button onClick={this.handleNextClick}>Next</button>
            </div>
		);
	}
}

export default GoogleDriveComp;