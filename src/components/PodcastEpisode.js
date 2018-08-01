import * as React from 'react';

const PodcastEpisode = (props) => {
    return (
        <div className="box">
            <p><b>{props.data.title}</b></p>
            <div dangerouslySetInnerHTML={{ __html: props.data.description }}></div>
            <div>
            <audio controls className="audio-control">
                <source src={props.data.audioUrl} type='audio/mpeg' />
            </audio>
            </div>
        </div>
    );
}

export default PodcastEpisode;