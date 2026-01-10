import React from 'react';
import { Route, Navigate, Redirect } from 'react-router-dom';
import { getToken, getUser } from './Common';
 
// handle the public routes
function PublicRouter({ component: Component, ...rest }) {
  return (
    <div>
      
      <Navigate
        {...rest}
        render={(props) => !getToken() ? <Component {...props} /> : <Navigate to={{ pathname: '/LoginSignup' }} />}
      />

    </div>
    
  )
}
 
export default PublicRouter;