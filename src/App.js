import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/bulma/css/bulma.min.css';
import './App.css';

import Navbar from './components/Navbar';
import Search from './components/Search';
import Home from './components/Home';
import Podcast from './components/Podcast';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />
          <Route path='/podcast/:id' component={Podcast} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;