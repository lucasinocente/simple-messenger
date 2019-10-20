import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Messages from './containers/Messages/Messages';
import MessagesList from './containers/Messages/MessagesList';
import Login from './containers/Login/Login';
import Verify from './containers/Login/Verify';
import NotFound from './NotFound/NotFound';
  
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/verify" exact={true} component={Verify}/>
        <Route path="/messages" exact={true} component={MessagesList}/>
        <Route path="/messages/:uid" exact={true} component={Messages}/>
        <Route path="**" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
