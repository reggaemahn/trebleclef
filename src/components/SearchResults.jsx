import React, { Component } from 'react';
import PodcastEpisode from './PodcastEpisode';

const SearchResults = (props) => {
    let episodes = props.searchResults.map((result, index) => {
        return <PodcastEpisode key={result.trackId} data={result} />
    });

    return (
        <div className="container">
            <h1 className="is-size-4">Results ({episodes.length})</h1>
            <div className="search-results">
                {episodes}
            </div>
        </div>
    );
}

export default SearchResults;
