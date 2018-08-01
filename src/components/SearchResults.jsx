import React from 'react';
import PodcastSearchResult from './PodcastSearchResult';

const SearchResults = (props) => {
    let episodes = props.searchResults.map((result) => {
        return <PodcastSearchResult key={result.trackId} data={result} />
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
