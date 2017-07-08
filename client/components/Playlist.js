/**
 * Playlist
 * Lists all the songs to select from
 * Author: Kevin Ha
 */

import React from 'react';

class Playlist extends React.Component {

    constructor(props) {
        super(props);
    }

    // Load current songs in playlist
    componentDidMount() {
        this.props.playlistActions.getSongs();
    }

    // Change the song playing
    handleSongClick = (song) => {
        this.props.playlistActions.selectSong(song);
    }

    render() {
        var { playlist } = this.props;

        return (
            <ul>
                Local Playlist:
                {
                    playlist.songs.map((song) => {
                        return <li key={song.id} value={song} onClick={() => this.handleSongClick(song)}>{song.name}</li>
                    })
                }
            </ul>
        );
    }
}

export default Playlist;
