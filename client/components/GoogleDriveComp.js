/**
 * Google Drive Component
 * Provides ui for google drive 
 * author: Kevin Ha
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

	componentDidMount() {
		if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
			this.listFiles();
		}
	}

	listFiles = () => {
		gapi.client.drive.files.list({
			pageSize: 10,
			fields: "nextPageToken, files(id, name, webContentLink)",
			q: "mimeType='audio/mpeg'",
            pageToken: this.state.pageTokenList[this.state.currPage - 1],
		}).then((response) => {
			console.log(response.result);
            this.setState({
                songList: response.result.files,
                nextPageToken: response.result.nextPageToken,
            })
		});
	}

    handleSongClick = (song) => {
        this.props.selectSong({
            name: song.name,
            url: song.webContentLink,
        });
        console.log('Pressed song: ' + song.name);
    }

    handlePrevClick = (event) => {
        
        // past the first page 
        if (this.state.currPage > 1) {
            this.setState({
                currPage: this.state.currPage - 1,
            },
            this.listFiles
            );
        }
    }

    handleNextClick = (event) => {

        // new page not accessed before
        if (this.state.currPage+1 > this.state.maxPage) {
            this.setState({
                currPage: this.state.currPage + 1,
                maxPage: this.state.maxPage + 1,
                pageTokenList: this.state.pageTokenList.concat([this.state.nextPageToken]),
            }, 
            this.listFiles
            );
        } else {
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