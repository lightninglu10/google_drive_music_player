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
// Google Login Form
import GoogleLoginForm from '../components/GoogleLoginForm';

// Playlist Actions
import PlaylistActions from '../actions/PlaylistActions';
// Login Actions
import LoginActions from '../actions/LoginActions';


class PlayerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {

        var { playlist, playlistActions, loginActions } = this.props;

        return (
            <div>
                <GoogleLoginForm loginFunction={loginActions} />

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
        loginActions: bindActionCreators(LoginActions, dispatch),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
