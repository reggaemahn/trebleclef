import * as React from 'react';

const PodcastEpisode = (props) => {
    return (
        <div className="box">
            <p className="is-size-5"><b>{props.data.title}</b></p>
            <p>{props.data.pubDate}</p>
            <div className="podcast-episode-description" dangerouslySetInnerHTML={{ __html: props.data.description }}></div>
            <div>
            <audio controls className="audio-control">
                <source src={props.data.audioUrl} type='audio/mpeg' />
            </audio>
            </div>
        </div>
    );
}

export default PodcastEpisode;