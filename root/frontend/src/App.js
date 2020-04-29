import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';
import Landing from './components/Landing';
import Explore from './components/Explore';


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Landing} />
        <Route exact path='/explore' component={Explore} />
      </div>
    </Router>
  );
}

export default App;
