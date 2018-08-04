import * as React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: this.props.searchTerm,
            showError: false
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
                                <button type="submit" className={`button is-info is-large is-rounded ${this.props.loadingAnim ? 'is-loading' : ''}`}>Go</button>
                            </div>

                        </div>
                        <div className={`${this.state.showError ? '' : 'is-hidden'}`}><p class="help is-danger">Enter the podcast name you'd like to find</p></div>
                    </form>
                </div>

                <div className="hero-foot"></div>
            </section>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const term = this.state.searchTerm;
        if (!term || term.length < 1) {
            this.setState({
                showError: true
            });
            return;
        }

        if(this.state.showError){
            this.setState({
                showError: false
            });
        }

        this.props.onSearch(this.state.searchTerm);
    }

    handleChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }
}

export default SearchBar;
