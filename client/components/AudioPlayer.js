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
         
                <audio src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/mpeg" controls /> 
                    
        );
    }
}

export default AudioPlayer;