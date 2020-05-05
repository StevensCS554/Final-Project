import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';
import Landing from './components/Landing';
import Explore from './components/Explore';
import Creategroup from './components/Creategroup';
import Userprofile from './components/Userprofile';
import Groupprofile from './components/Groupprofile';

function App() {
   return (
      <Router>
         <div className="App">
            <Route exact path='/' component={Landing} />
            <Route exact path='/explore' component={Explore} />
            <Route exact path='/userprofile/:userId' component={Userprofile} />
            <Route exact path='/create-group/:userId' component={Creategroup} />
            <Route exact path='/group-profile/:groupId' component={Groupprofile} />
         </div>
      </Router>
   );
}

export default App;
