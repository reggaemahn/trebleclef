import React, { Component } from 'react';
import {UrlHelpers} from '../common/libs/UrlHelpers';

import  Navbar  from '../components/Navbar';
import  SearchBar from '../components/SearchBar';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      searchTerm: new UrlHelpers().getUrlParameter('query')
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch = (query) => {
    this.setState({
      searchTerm: query
    });

    this.props.history.push(`/search?query=${query}`);
  }

  render() {
    return (
      <div>
        <Navbar />
        <SearchBar searchTerm={this.state.searchTerm} onSearch={this.onSearch} />
      </div>
    );
  }
}

export default Home;
