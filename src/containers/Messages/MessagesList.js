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
    <div className="contacts-list">
      <ul className="contacts">
        <li>
          <a className="contact">
            <div className="avatar">
              <img src="https://api.adorable.io/avatars/60/olucassanchez@gmail.com"></img>
            </div>
            <div className="email">
              <div className="name">olucassanchez</div>
              <div className="provider">@gmail.com</div>
            </div>
          </a>
        </li>
        
        <li className="contact">
          <div className="avatar">
            <img src="https://api.adorable.io/avatars/60/guerrinha@comum.org"></img>
          </div>
          <div className="email">
            <div className="name">guerrinha</div>
            <div className="provider">@comum.org</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Messages;
