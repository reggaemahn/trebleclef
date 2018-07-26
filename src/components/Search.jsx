import React, { Component } from 'react';
import PodcastEpisode from '../components/PodcastEpisode';
import { UrlHelpers } from '../common/libs/UrlHelpers';
import { SearchService } from '../common/services/SearchService';

class App extends Component {

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

    render() {
        let episodes = this.state.searchResults.map((result, index) => {
            return <PodcastEpisode key={index} data={result} />
        });

        return (
            <div className="container">
                <h1 className="is-size-4">Results</h1>
                <div className="search-results">
                    {episodes}
                </div>
            </div>
        );
    }
}

export default App;
