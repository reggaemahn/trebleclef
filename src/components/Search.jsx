import React, { Component } from 'react';
import UrlHelpers from '../common/libs/UrlHelpers';
import { SearchService } from '../common/services/SearchService';
import PaginationHelper from '../common/libs/PaginationHelper';
import * as AppSettings from '../common/AppSettings';

import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

class Search extends Component {

    constructor(props) {
        super(props);

        const query = new UrlHelpers()
            .getUrlParameter('query');

        this.state = {
            searchResults: [],
            currentPage: [],
            currentPageNum: 0,
            pageCount: 0,
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

            const pageCount = Math.ceil(searchResults.length / AppSettings.SEARCH_PAGINATION_FACTOR);
            const currentPageEnd = pageCount > AppSettings.SEARCH_PAGINATION_FACTOR ? AppSettings.SEARCH_PAGINATION_FACTOR : pageCount;

            this.setState({
                searchResults: searchResults,
                currentPage: [...searchResults].splice(0, currentPageEnd),
                currentPageNum: 1,
                pageCount: pageCount,
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

    onPaginate = (nextPageNumber) => {
        if (nextPageNumber >= 0 && nextPageNumber <= this.state.pageCount) {

            const page = new PaginationHelper()
                .paginate(nextPageNumber, this.state.searchResults, AppSettings.SEARCH_PAGINATION_FACTOR);

            this.setState({
                currentPageNum: page.currentPageNum,
                currentPage: page.currentPage
            });
        }
    }

    render() {
        return (
            <div>
                <SearchBar
                    searchTerm={this.state.searchTerm}
                    loadingAnim={this.state.loadingAnim}
                    onSearch={this.goToSearchPage} />

                <SearchResults
                    pageCount={this.state.pageCount}
                    currentPageNum={this.state.currentPageNum}
                    totalResults={this.state.searchResults.length}
                    searchResults={this.state.currentPage}
                    onPaginate={this.onPaginate} />
            </div>
        );
    }
}

export default Search;
