import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { globalContext } from '../store';

function Logout() {
  const context = useContext(globalContext);

  React.useEffect(() => {
    localStorage.removeItem('token');
    context.dispatch({ type: 'LOGOUT' });
  }, [context]);

  return <Redirect to="/login" />;
}

export default Logout;
