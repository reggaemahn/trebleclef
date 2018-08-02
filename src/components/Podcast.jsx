import React, { Component } from 'react';
import { SearchService } from '../common/services/SearchService';
import GUID from '../common/libs/GUID.js';

import PodcastEpisode from './PodcastEpisode';
import PodcastHeader from './PodcastHeader';


class Podcast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: false,
            title: '',
            description: '',
            imageUrl: '',
            author: '',
            episodes: []
        }
    }

    async componentDidMount() {
        this.setState({ showLoader: true });

        const podcastId = this.props.match.params.id;

        try {
            const podcastDetails = await new SearchService()
                .getPodcastDetails(podcastId);

            this.setState({
                showLoader: false,
                title: podcastDetails.title,
                description: podcastDetails.description,
                imageUrl: podcastDetails.imageUrl,
                author: podcastDetails.artist,
                episodes: podcastDetails.episodes
            });
        } catch (err) {
            this.setState({
                showLoader: false
            });

            this.props.onError();
        }
    }

    render() {
        let episodes = this.state.episodes.map((episode) => {
            var id = new GUID().getGUID();
            return <PodcastEpisode key={id} data={episode} />
        });

        return (
            <div className="container">
                <PodcastHeader
                    showLoader={this.state.showLoader}
                    title={this.state.title}
                    description={this.state.description}
                    imageUrl={this.state.imageUrl}
                    author={this.state.author} />

                {episodes}
            </div>
        );
    }
}

export default Podcast;