/**
 * Audio Player
 * Wrapper for the HTML Audio tag implementation
 * author: Kevin Ha
 */

import React from 'react';

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return (
         
            <audio src={this.props.playlist.current_song_url} type="audio/mpeg" controls autoPlay /> 
        
        );
    }
}

export default AudioPlayer;