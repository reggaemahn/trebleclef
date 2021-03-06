import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';


class Home extends Component {
  onSearch = (query) => {
    this.props.history.push(`/search?query=${query}`);
  }

  render() {
    return (
      <div>
        <SearchBar onSearch={this.onSearch} />
      </div>
    );
  }
}

export default Home;
