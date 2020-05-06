import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/utilities/PrivateRoutes';
import Landing from './components/Landing';
import Explore from './components/Explore';
import Signup from './components/Signup';
import Login from './components/Login';
import Creategroup from './components/Creategroup';
import Userprofile from './components/Userprofile';
import Groupprofile from './components/Groupprofile';

function App() {
   return (
      <AuthProvider>
         <Router>
            <div className="App">
               <Route exact path='/' component={Landing} />
               <Route exact path='/explore' component={Explore} />
               <Route exact path='/signup' component={Signup} />
               <Route exact path='/login' component={Login} />
               <PrivateRoute path='/userprofile/:userId' component={Userprofile} />
               <PrivateRoute path='/create-group/:userId' component={Creategroup} />
               <PrivateRoute path='/group-profile/:groupId' component={Groupprofile} />
            </div>
         </Router>
      </AuthProvider>
   );
}

export default App;
