import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/bulma/css/bulma.min.css';
import './App.css';

import Navbar from './components/Navbar';
import Search from './components/Search';
import Home from './components/Home';
import Podcast from './components/Podcast';
import ErrorBanner from './components/ErrorBanner';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrorBanner: false
    };
  }

  onError = () => {
    if (!this.state.showErrorBanner) {
      this.setState({
        showErrorBanner: true
      });
    }
  }

  hideError = () => {
    if (this.state.showErrorBanner) {
      this.setState({
        showErrorBanner: false
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ErrorBanner hideError={this.hideError} isErrorState={this.state.showErrorBanner} />
          <Navbar />

          <Route exact path='/' component={Home} />
          <Route exact path='/search' render={(props) => <Search {...props} onError={this.onError} />} />
          <Route path='/podcast/:id' render={(props) => <Podcast {...props} onError={this.onError} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;