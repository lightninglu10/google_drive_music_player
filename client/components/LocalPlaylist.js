/**
 * Local Playlist
 * Lists all the songs to select from
 * Author: Kevin Ha
 */

import React from 'react';

// Aphrodite
import { StyleSheet, css } from 'aphrodite';
// Bootstrap
import { DropdownButton, MenuItem, Table, thead, tr, th, tbody } from 'react-bootstrap';

class LocalPlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dirBool: true,
        }
    }

    // Change the song playing
    handleSongClick = (song) => {
        var attr = {
                songLocation: "local",
                song: song,
                prevSong: (({ id, currentSong, currentSongUrl }) => ({ id, currentSong, currentSongUrl }))(this.props.song),
                prevSongIndex: 0,
            }
        this.props.playlistActions.selectSong(attr);
    }

    // Delete song
    handleDeleteButton = (song) => {
        var attr = {
            songId: song.id,
        }   
        this.props.playlistActions.deleteLocalSong(attr);
    }

    // Queue song
    handleQueueButton = (song) => {
        // If queue is initially not empty or a song is playing
        if (this.props.playlist.queue.length > 0 || this.props.song.currentSong != '') {
            this.props.playlistActions.addToQueue(song);
        } else { // Else just play the song without queuing 
            var attr = {
                songLocation: "local",
                song: song,
                prevSong: (({ id, currentSong, currentSongUrl }) => ({ id, currentSong, currentSongUrl }))(this.props.song),
                prevSongIndex: 0,
            }
            this.props.playlistActions.selectSong(attr);
        }
    }

    // Order playlists by name or time added
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
        var { playlist, handlePlaylistButton } = this.props;
        var songList = playlist.songs;

        return (
            <div className={css(styles.tab)}>
                <h4 className={css(styles.name)}>Local Playlist:</h4>
                <Table striped bordered hover responsive className={css(styles.table)}>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => {this.handleOrderClick("name")}}>Name</th>
                            <th onClick={() => {this.handleOrderClick("time")}}>Added</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {
                            songList.map((song) => {
                                return (
                                    <tr key={song.id}>
                                        <td>
                                            <DropdownButton title="-" noCaret id="songOptions" bsSize="xsmall">
                                                <MenuItem onClick={() => this.handleDeleteButton(song)}>Delete Song</MenuItem>
                                                <MenuItem onClick={() => this.handleQueueButton(song)}>Add Song to Queue</MenuItem>
                                                <MenuItem onClick={() => handlePlaylistButton(song)}>Add Song to Playlist</MenuItem>
                                            </DropdownButton>
                                        </td>
                                        <td value={song} onClick={() => this.handleSongClick(song)}>{song.name}</td>
                                        <td>{song.created_at.slice(0,10)}</td>
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

const styles = StyleSheet.create({
    tab: {
        paddingTop: '160px'
    },
    name: {
        position: 'fixed',
        zIndex: '9999'
    },
    table: {
        marginTop: '40px',
        zIndex: '-9999',
    }
})

export default LocalPlaylist;
