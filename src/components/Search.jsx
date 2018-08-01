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
    }

    async componentDidMount() {
        this.setState({ loadingAnim: true });
        const initialSearch = await new SearchService()
            .findPodcasts(this.state.searchTerm);

        this.setState({
            searchResults: initialSearch,
            loadingAnim: false
        });
    }

    async componentWillReceiveProps() {
        const newQuery = new UrlHelpers()
            .getUrlParameter('query');

        if (this.state.searchTerm !== newQuery) {
            this.setState({ loadingAnim: true });

            const updatedSearch = await new SearchService()
                .findPodcasts(newQuery);

            this.setState({
                searchResults: updatedSearch,
                searchTerm: newQuery,
                loadingAnim: false
            });
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
