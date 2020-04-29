import React from 'react';
import './styles/App.scss';
import Landing  from './components/Landing';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/landing" component={Landing} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
