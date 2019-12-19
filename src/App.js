import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Messages from './containers/Messages/Messages';
import ContactsList from './containers/Contacts/ContactsList';
import Login from './containers/Login/Login';
import Verify from './containers/Login/Verify';
import NotFound from './containers/NotFound/NotFound';

import './App.scss';
  
function App() {
    return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/verify" exact={true} component={Verify}/>
        <Route path="/messages" exact={true} component={ContactsList}/>
        <Route path="/messages/:uid" exact={true} component={Messages}/>
        <Route path="**" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
