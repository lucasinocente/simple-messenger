import React from 'react';
import './Messages.css';

import firebase from '../../firebase/Firebase';

const logout = async () => {
  console.log('funcionou');
  try {
    await firebase.auth().signOut();
    window.location.href = '/login';
  } catch (error) {
    console.log('error logout', error);
  }
};

const Messages = () => {
  return (
    <div className="App">
      <header>
        <button type="button" onClick={logout}>Logout</button>
      </header>
      <section className="container row">
        <div className="column column-messages">
          <div className="messages">
            <div className="message message-received">
              Olá!
            </div>
            <div className="message message-send">
              Oi, como vai você?
            </div>
          </div>
          <div className="form">
            <form>
              <input type="text"></input>
              <button type="button">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Messages;
