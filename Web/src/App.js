import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import {isAuthenticated} from './auth.js';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} isAuth={isAuthenticated} />
      </Switch>  
    </BrowserRouter>
  );
}

function PrivateRoute({isAuth, component: Component, ...rest}) {
  return (
      <Route {...rest} render={(props) => {
        console.log(isAuth);
          if(isAuth() === true) {
            return <Component />
          } else {
            return <Redirect to={{ pathname: '/', state: {from: props.location} }} />
          }
      }} />
  );
}
