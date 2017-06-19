/**
 * Player Page
 * Main page of the app with the audio player
 * author: Kevin Ha
 */

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Playlist
import Playlist from '../components/Playlist'; 
// Audio Player
import AudioPlayer from '../components/AudioPlayer';

// Song Actions
import PlaylistActions from '../actions/PlaylistActions';


class PlayerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        var { playlist, playlistActions } = this.props;

        return (
            <div>
                <AudioPlayer />
                
                <Playlist playlistActions={playlistActions} playlist={playlist} />

                Currently Playing: {playlist.current_song.file_address}
            </div>        

        );
    }
}

// REDUX

function mapStateToProps(state) {
    return { 
        song: state.song,
        playlist: state.playlist,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        playlistActions: bindActionCreators(PlaylistActions, dispatch),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
