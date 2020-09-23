import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

//Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

import './main.scss';
import wrapper from './components/wrapper';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={wrapper(Home)} />
        <Route path="/login" component={wrapper(Login)} />
        <Route path="/register" component={wrapper(Register)} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
