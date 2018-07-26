import * as React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: this.props.searchTerm
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchTerm: nextProps.searchTerm
        });
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
                                <a className="button is-info is-large is-rounded">Go</a>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="hero-foot"></div>
            </section>
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSearch(this.state.searchTerm);
    }

    handleChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }
}

export default SearchBar;
