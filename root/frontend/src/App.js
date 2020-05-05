import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';
import Landing from './components/Landing';
import Explore from './components/Explore';
import Creategroup from './components/Creategroup';
import Userprofile from './components/Userprofile';

function App() {
   return (
      <Router>
         <div className="App">
            <Route exact path='/' component={Landing} />
            <Route exact path='/explore' component={Explore} />
            <Route exact path='/userprofile/:id' component={Userprofile} />
            <Route exact path='/create-group/:id' component={Creategroup} />
         </div>
      </Router>
   );
}

export default App;
