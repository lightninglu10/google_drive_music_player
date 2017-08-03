/**
 * Custom Playlist
 * Lists all the songs from the specified playlist
 * Author: Kevin Ha
 */

import React from 'react';

// Bootstrap
import { DropdownButton, MenuItem, Table, thead, tr, th, tbody } from 'react-bootstrap';

class CustomPlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customPlaylist: this.props.customPlaylist,
            dirBool: true,
        }
    }

    // Update state when the current playlist changes
    componentWillReceiveProps(nextProps) {
        if (nextProps.customPlaylist !== this.state.customPlaylist) {
            this.setState({
                customPlaylist: nextProps.customPlaylist,
            })   
        }
    }

    // Change the song playing
    handleSongClick = (song) => {
        var attr = {
                songLocation: "custom",
                song: song,
                prevSong: (({ id, currentSong, currentSongUrl }) => ({ id, currentSong, currentSongUrl }))(this.props.song),
                prevSongIndex: 0,
            }
        this.props.playlistActions.selectSong(attr);
    }

    // Delete song from playlist
    handleDeleteButton = (song) => {
        var attr = {
            playlistId: this.state.customPlaylist.id,
            songId: song.id,
        }   
        this.props.playlistActions.deleteFromPlaylist(attr);
    }

    handleQueueButton = (song) => {
        // If queue is initially not empty or a song is playing
        if (this.props.playlist.queue.length > 0 || this.props.song.currentSong != '') {
            this.props.playlistActions.addToQueue(song);
        } else { // Else just play the song without queuing 
            var attr = {
                songLocation: "custom",
                song: song,
                prevSong: (({ id, currentSong, currentSongUrl }) => ({ id, currentSong, currentSongUrl }))(this.props.song),
                prevSongIndex: 0,
            }
            this.props.playlistActions.selectSong(attr);
        }
    }

    // Order playlists by name 
    handleOrderClick = (orderBy) => {
        // Alternate order direction with state bool variable
        var bool = this.state.dirBool;
        var orderDir;
        if (bool == true) {orderDir = 'asc'}
        else {orderDir = 'desc'}

        var attr = {
            by: orderBy,
            dir: orderDir,
        }
        this.props.playlistActions.orderPlaylist(attr);

        // Invert state bool variable
        this.setState({dirBool: !bool});
    }

    render() {
        var { handlePlaylistButton, playlist } = this.props;
        var songList = playlist.playlistSongs;

        return (
            <div>
                <h4>{this.state.customPlaylist.name} Playlist:</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => {this.handleOrderClick("name")}}>Name</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            songList.map((song) => {
                                return (
                                    <tr key={song.id}>
                                        <td>
                                            <DropdownButton title="-" noCaret id="songOptions" bsSize="xsmall">
                                                <MenuItem onClick={() => this.handleDeleteButton(song)}>Delete From Playlist</MenuItem>
                                                <MenuItem onClick={() => this.handleQueueButton(song)}>Add Song to Queue</MenuItem>
                                                <MenuItem onClick={() => handlePlaylistButton(song)}>Add Song to Playlist</MenuItem>
                                            </DropdownButton>
                                        </td>
                                        <td value={song} onClick={() => this.handleSongClick(song)}>{song.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CustomPlaylist;
