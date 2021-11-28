import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import Waypoints from './components/Waypoints';
import Event from './components/Event';
import Activity from './components/Activity';
import Museum from './components/Museum';
import Heatmap from './components/Heatmap';

import {isAuthenticated} from './auth.js';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/waypoints" exact component={Waypoints} isAuth={isAuthenticated} />
        <PrivateRoute path="/events" exact component={Event} isAuth={isAuthenticated} />
        <PrivateRoute path="/activity" exact component={Activity} isAuth={isAuthenticated} />
        <PrivateRoute path="/museum" exact component={Museum} isAuth={isAuthenticated} />
        <PrivateRoute path="/heatmap" exact component={Heatmap} isAuth={isAuthenticated} />
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
