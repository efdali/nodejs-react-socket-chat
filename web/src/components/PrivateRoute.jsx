import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { globalContext } from '../store';

function PrivateRoute(props) {
  const { isAuthenticated } = useContext(globalContext).state;
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  });
  return isAuthenticated ? <Route {...props} /> : '';
}

export default PrivateRoute;
