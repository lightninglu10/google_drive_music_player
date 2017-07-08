/**
 * Audio Player
 * Wrapper for the HTML Audio tag implementation
 * Author: Kevin Ha
 */

import React from 'react';

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <audio src={this.props.playlist.current_song_url} type="audio/mpeg" controls autoPlay /> 
        );
    } 
}

export default AudioPlayer;