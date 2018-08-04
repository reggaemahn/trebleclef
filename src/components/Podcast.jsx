import React, { Component } from 'react';
import { SearchService } from '../common/services/SearchService';
import GUID from '../common/libs/GUID.js';
import PaginationHelper from '../common/libs/PaginationHelper';
import * as AppSettings from '../common/AppSettings';

import PodcastEpisode from './PodcastEpisode';
import PodcastHeader from './PodcastHeader';
import Pagination from './Pagination';


class Podcast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: false,
            title: '',
            description: '',
            imageUrl: '',
            author: '',
            currentPageNum: 0,
            pageCount: 0,
            currentPage: [],
            episodes: []
        }
    }

    async componentDidMount() {
        this.setState({ showLoader: true });

        const podcastId = this.props.match.params.id;

        try {
            const podcastDetails = await new SearchService()
                .getPodcastDetails(podcastId);

            const pageCount = Math.ceil(podcastDetails.episodes.length / AppSettings.SEARCH_PAGINATION_FACTOR);
            const currentPageEnd = pageCount > AppSettings.SEARCH_PAGINATION_FACTOR ? AppSettings.SEARCH_PAGINATION_FACTOR : pageCount;

            this.setState({
                showLoader: false,
                title: podcastDetails.title,
                description: podcastDetails.description,
                imageUrl: podcastDetails.imageUrl,
                author: podcastDetails.artist,
                episodes: podcastDetails.episodes,
                pageCount: pageCount,
                currentPageNum: 1,
                currentPage: [...podcastDetails.episodes].splice(0, currentPageEnd)
            });
        } catch (err) {
            this.setState({
                showLoader: false
            });

            this.props.onError();
        }
    }

    onPaginate = (nextPageNumber) => {
        if (nextPageNumber >= 0 && nextPageNumber <= this.state.pageCount) {

            const page = new PaginationHelper()
                .paginate(nextPageNumber, this.state.episodes);

            this.setState({
                currentPageNum: page.currentPageNum,
                currentPage: page.currentPage
            });
        }
    }

    render() {
        let episodes = this.state.currentPage.map((episode) => {
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

                <Pagination
                    onPaginate={this.onPaginate}
                    currentPageNum={this.state.currentPageNum}
                    pageCount={this.state.pageCount} />
            </div>
        );
    }
}

export default Podcast;