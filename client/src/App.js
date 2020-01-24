import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './containers/Login/Login';
import Verify from './containers/Login/Verify';
import Contacts from './containers/Contacts/Contacts';
import ChatRoom from './containers/ChatRoom/ChatRoom';
import NotFound from './containers/NotFound/NotFound';

import './App.scss';

function App() {
    return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/verify" exact={true} component={Verify}/>
        <Route path="/messages" exact={true} component={Contacts}/>
        <Route path="/messages/:uid" exact={true} component={ChatRoom}/>
        <Route path="**" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
