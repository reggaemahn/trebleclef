import React, { Component } from 'react';
import UrlHelpers from '../common/libs/UrlHelpers';
import { SearchService } from '../common/services/SearchService';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

class Search extends Component {

    constructor(props) {
        super(props);

        const query = new UrlHelpers()
            .getUrlParameter('query');

        this.state = {
            searchResults: [],
            searchTerm: query,
            loadingAnim: false
        }

        this.updateSearchResults = this.updateSearchResults.bind(this);
    }

    async componentDidMount() {
        this.updateSearchResults(this.state.searchTerm);
    }

    async componentWillReceiveProps() {
        const newQuery = new UrlHelpers()
            .getUrlParameter('query');

        if (this.state.searchTerm !== newQuery) {
            this.updateSearchResults(newQuery);
        }
    }

    async updateSearchResults(searchTerm) {
        this.setState({ loadingAnim: true });

        try {
            const searchResults = await new SearchService()
                .findPodcasts(searchTerm);

            this.setState({
                searchResults: searchResults,
                searchTerm: searchTerm,
                loadingAnim: false
            });
        } catch (err) {
            this.setState({
                searchTerm: searchTerm,
                loadingAnim: false
            });

            this.props.onError();
        }
    }

    goToSearchPage = (searchTerm) => {
        if (searchTerm !== this.state.searchTerm) {
            this.props.history.push(`/search?query=${searchTerm}`);
        }
    }

    render() {
        return (
            <div>
                <SearchBar searchTerm={this.state.searchTerm} loadingAnim={this.state.loadingAnim} onSearch={this.goToSearchPage} />
                <SearchResults searchResults={this.state.searchResults} />
            </div>
        );
    }
}

export default Search;
