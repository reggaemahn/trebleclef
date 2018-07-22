import * as React from 'react';

class PodcastEpisode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.data.name,
            description: this.props.data.description,
            artworkSrc: this.props.data.thumbnailUrl,
            artist: this.props.data.artist
        };
    }

    render() {
        return (
            <a className="box search-result-item" href="#">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-128x128">
                            <img src={ this.state.artworkSrc } alt="artwork" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{ this.state.title }</strong>
                                <br />
                            </p>
                        </div>
                    </div>
                </article>
            </a>
        );
    }
}

export default PodcastEpisode;
