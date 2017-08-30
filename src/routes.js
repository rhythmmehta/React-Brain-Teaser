import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import UserResults from './containers/UserResults';


const Routes = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/results" component={UserResults}/>

  </Switch>
);

export default Routes;
