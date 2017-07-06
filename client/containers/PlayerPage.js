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
// Google Drive Componenet
import GoogleDriveComp from '../components/GoogleDriveComp';

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

        var { playlist, playlistActions, loginActions, user } = this.props;

        return (
            <div>

                <AudioPlayer playlist={playlist} />

                <GoogleDriveComp user={user} selectSong={playlistActions.selectSong} playlist={playlist} />
                
                {/*<Playlist playlistActions={playlistActions} playlist={playlist} />*/}

                Currently Playing: {playlist.current_song} <br /><br />

                google user:
                <div>
                { user.isLoggedIn 
                    ? user.first_name
                    : 'User is not logged in'
                }
                </div>

            </div>        

        );
    }
}

// REDUX

function mapStateToProps(state) {
    return { 
        playlist: state.playlist,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        playlistActions: bindActionCreators(PlaylistActions, dispatch),
        loginActions: bindActionCreators(LoginActions, dispatch),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
