/**
 * Player Page
 * Main page of the app with the audio player
 * author: Kevin Ha
 */

import React from 'react';

<<<<<<< HEAD
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Playlist
import Playlist from '../components/Playlist'; 
// Audio Player
import AudioPlayer from '../components/AudioPlayer';

// Song Actions
import PlaylistActions from '../actions/PlaylistActions';
=======
>>>>>>> 2df6bdc9affa4e4be69a92940848f97ddc274674

class PlayerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
<<<<<<< HEAD
=======

>>>>>>> 2df6bdc9affa4e4be69a92940848f97ddc274674
        }
    }

    componentDidMount() {

    }

    render() {
<<<<<<< HEAD
        var { playlist, playlistActions } = this.props;

        return (
            <div>
                <AudioPlayer />
                
                <Playlist playlistActions={playlistActions} playlist={playlist} />

                Currently Playing: {playlist.current_song.file_address}
            </div>        
=======
        return (
            
            <div>Hello World!</div>
>>>>>>> 2df6bdc9affa4e4be69a92940848f97ddc274674

        );
    }
}

<<<<<<< HEAD
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
=======
export default PlayerPage;
>>>>>>> 2df6bdc9affa4e4be69a92940848f97ddc274674
