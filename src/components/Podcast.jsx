import * as AppSettings from "../common/AppSettings";

import React, { Component } from "react";

import Downloader from 'js-file-downloader';
import Pagination from "./Pagination";
import PaginationHelper from "../common/libs/PaginationHelper";
import PodcastEpisode from "./PodcastEpisode";
import PodcastHeader from "./PodcastHeader";
import { SearchService } from "../common/services/SearchService";
import UrlHelpers from "../common/libs/UrlHelpers";

class Podcast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: false,
            title: "",
            description: "",
            imageUrl: "",
            author: "",
            currentPageNum: 0,
            pageCount: 0,
            currentPage: [],
            episodes: [],
            showDownloadProgress: false,
            downloadPercentage: 0,
            progressBarState: 'is-link'
        };

        this.updateProgressBar = this.updateProgressBar.bind(this);
        this.setProgressBarState = this.setProgressBarState.bind(this);
        this.downloadAllEpisodes = this.downloadAllEpisodes.bind(this);
        this.downloadQueue = this.downloadQueue.bind(this);
    }

    async componentDidMount() {
        this.setState({ showLoader: true });

        const podcastId = this.props.match.params.id;

        try {
            const podcastDetails = await new SearchService().getPodcastDetails(
                podcastId
            );

            const pageCount = Math.ceil(
                podcastDetails.episodes.length / AppSettings.SEARCH_PAGINATION_FACTOR
            );
            const currentPageEnd =
                pageCount > AppSettings.SEARCH_PAGINATION_FACTOR
                    ? AppSettings.SEARCH_PAGINATION_FACTOR
                    : pageCount;

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

    onPaginate = nextPageNumber => {
        if (nextPageNumber >= 0 && nextPageNumber <= this.state.pageCount) {
            const page = new PaginationHelper().paginate(
                nextPageNumber,
                this.state.episodes,
                AppSettings.SEARCH_PAGINATION_FACTOR
            );

            this.setState({
                currentPageNum: page.currentPageNum,
                currentPage: page.currentPage
            });
        }
    };

    updateProgressBar = (progressPercent) => {
        this.setState({ downloadPercentage: progressPercent });
    };

    setProgressBarState = (newProgressBarState) => {
        this.setState({ progressBarState: newProgressBarState });
    }

    downloadAllEpisodes = async () => {
        this.setState({ showDownloadProgress: true, downloadPercentage: 0 });

        const downloadQueue = [];

        var i,j;
        for (i=0, j=this.state.episodes.length; i<j; i+=AppSettings.MAX_PARALLEL_DOWNLOADS) {
            const currentQueue = this.state.episodes.slice(i, i+AppSettings.MAX_PARALLEL_DOWNLOADS);
            downloadQueue.push(currentQueue);
        }

        for(var x=0; x<downloadQueue.length; x++){
            await this.downloadQueue(downloadQueue[x]);
        }
    };

    downloadQueue = async (episodes) => {
        const downloads = [];
        episodes.map(function(episode){
            if(typeof episode.audioUrl !== 'undefined'){
                console.log('downloading ' + episode.title);
                downloads.push(
                    new Downloader({ 
                        url: new UrlHelpers().getCorsifiedUrl(episode.audioUrl),
                        filename: `${episode.title}.mp3`
                    })
                );
            }
            else{
                console.log('Failed to download episode:');
                console.log(episode);
            }
        });

        await Promise.all(downloads).catch(error => console.log(error));
        this.setState({downloadPercentage: this.state.downloadPercentage + episodes.length});
    }

    render() {
        let episodes = this.state.currentPage.map(episode => {
            return <PodcastEpisode key={episode.uniqueId} data={episode} />;
        });

        return (
            <div className="container">
                <PodcastHeader
                    showLoader={this.state.showLoader}
                    title={this.state.title}
                    description={this.state.description}
                    imageUrl={this.state.imageUrl}
                    author={this.state.author}
                    showDownloadProgress={this.state.showDownloadProgress}
                    downloadMax={this.state.episodes.length}
                    downloadPercentage={this.state.downloadPercentage}
                    progressBarState={this.state.progressBarState}
                    downloadAllEpisodes={this.downloadAllEpisodes}
                />

                {episodes}

                <Pagination
                    onPaginate={this.onPaginate}
                    currentPageNum={this.state.currentPageNum}
                    pageCount={this.state.pageCount}
                />
            </div>
        );
    }
}

export default Podcast;
