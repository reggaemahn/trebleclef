import React from 'react';
import PodcastSearchResult from './PodcastSearchResult';
import Pagination from './Pagination';

const SearchResults = (props) => {
    let episodes = props.searchResults.map((result) => {
        return <PodcastSearchResult key={result.trackId} data={result} />
    });

    return (
        <div className="container">
            <div className={`${props.totalResults > 0 ? '' : 'is-hidden'}`}>
                <h1 className="is-size-4">Results ({props.totalResults})</h1>
                <div className="search-results">
                    {episodes}
                </div>

                <Pagination onPaginate={props.onPaginate} currentPageNum={props.currentPageNum} pageCount={props.pageCount} />
            </div>
            <div className={`${props.totalResults >= 0 ? 'is-hidden' : ''}`}>
                <p>No podcasts found matching that name</p>
            </div>
        </div>
    );
}

export default SearchResults;
