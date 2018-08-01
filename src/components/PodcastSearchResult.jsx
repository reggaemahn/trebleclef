import * as React from 'react';
import { Link } from 'react-router-dom';

const PodcastSearchResult = (props) => {
    return (
        <Link className="box search-result-item" to={`/podcast/${props.data.trackId}`}>
            <article className="media">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img src={props.data.thumbnailUrl} alt="artwork" />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{props.data.name}</strong>
                            <br />
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default PodcastSearchResult;
