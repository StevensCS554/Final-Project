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
         <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
         <script src="./components/js/createGroup.js"></script>
      </Router>
   );
}

export default App;
