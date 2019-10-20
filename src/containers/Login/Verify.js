import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/Firebase';
import "firebase/auth";
import { checkIsAdmin } from '../../firebase/helpers';

import './Login.css';

const Verify = () => {
  const [status, setStatus] = useState('Autenticando...');

  useEffect(() => {
    const email = window.localStorage.getItem('simpleMessengerEmail');
    const isSignIn = firebase.auth().isSignInWithEmailLink(window.location.href);
    const signIn = firebase.auth().signInWithEmailLink(email, window.location.href);

    if (!isSignIn || !signIn) {
      setStatus('404');
      return;
    }

    firebase.auth().onAuthStateChanged(async function(user) {
      if (!user) { return; }
      console.log('Verify', user);
      
      const admin = await checkIsAdmin(firebase);

      if (admin) {
        setStatus('Direcionando para mensagens...');
        window.location.href = `messages`;
      } else {
        setStatus('Direcionando para mensagens...');
          window.location.href = `messages/${user.uid}`;
      }
    });
  }, []);

  return (
    <div className="App">
      { status }
    </div>
  );
}

export default Verify;
