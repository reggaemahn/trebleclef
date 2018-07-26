import React, { Component } from 'react';
import { UrlHelpers } from '../common/libs/UrlHelpers';
import { SearchService } from '../common/services/SearchService';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

class Search extends Component {

    constructor(props) {
        super(props);

        const query = new UrlHelpers().getUrlParameter('query');
        this.state = {
            searchResults: [],
            searchTerm: query
        }
    }

    async componentDidMount() {
        const initialSearch = await new SearchService(this.state.searchTerm)
            .findPodcastEpisodes();

        this.setState({
            searchResults: initialSearch
        });
    }

    async componentWillReceiveProps() {
        const newQuery = new UrlHelpers().getUrlParameter('query');

        if (this.state.searchTerm !== newQuery) {
            console.log(`previous: ${this.state.searchTerm} | new: ${newQuery}`);

            const updatedSearch = await new SearchService(newQuery)
                .findPodcastEpisodes();

            this.setState({
                searchResults: updatedSearch,
                searchTerm: newQuery
            });
        }
    }

    goToSearchPage = (searchTerm) => {
        if (searchTerm !== this.state.searchTerm) {
            console.log(`Navigating from ${this.state.searchTerm} to ${ searchTerm }`);
            this.props.history.push(`/search?query=${searchTerm}`);
        }
    }

    render() {
        return (
            <div>
                <SearchBar onSearch={this.goToSearchPage} />
                <SearchResults searchResults={this.state.searchResults} />
            </div>
        );
    }
}

export default Search;
