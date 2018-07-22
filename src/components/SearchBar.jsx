import * as React from 'react';
import SearchService from '../common/services/searchService';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <section className="hero is-light is-small">
                <div className="hero-head"></div>

                <div className="hero-body">
                    <form className="container has-text-centered" onSubmit={this.handleSubmit}>
                        <div className="field has-addons search-bar">
                            <div className="control has-icons-left has-icons-right is-large is-expanded">
                                <input onChange={this.handleChange} value={this.state.searchTerm} name="query" className="input is-large is-rounded main-search" type="text" placeholder="Search ..." />
                                <span className="icon is-medium is-left">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                            <div className="control is-large">
                                <a className={`button is-info is-large is-rounded ${this.state.isLoading ? 'is-loading' : ''}`}>Find Podcasts</a>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="hero-foot"></div>
            </section>
        );
    }

    async handleSubmit(event) {
        event.preventDefault();

        this.setState({ isLoading: true });
        
        const results = await new SearchService(this.state.searchTerm)
            .findPodcastEpisodes();

        this.setState({
            isLoading: false,
            searchTerm: ''
        });

        this.props.handleSubmit(results);
    }

    handleChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }
}

export default SearchBar;
