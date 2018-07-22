import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.min.css';
import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PodcastEpisode from './components/PodcastEpisode';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommended: [],
      searchResults: []
    }
  }

  handleSubmit = (results) => {
    this.setState({
      searchResults: results
    });
  }


  render() {
    let episodes = this.state.searchResults.map((result, index) => {
      return <PodcastEpisode key={index} data={result} />
    });


    return (
      <div>
        <Navbar />
        <SearchBar handleSubmit={this.handleSubmit} />

        <div className="container">
          <h1 className={ `is-size-4 ${ this.state.searchResults.length < 1 ? 'is-hidden' : '' }` }>Results</h1>
          <div className="search-results">
            { episodes }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
