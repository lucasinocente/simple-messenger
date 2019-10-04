import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/Firebase';
import "firebase/auth";

import './Login.css';

const Verify = () => {

  const [error, setError] = useState('');

  useEffect(() => {
    const email = window.localStorage.getItem('simpleMessengerEmail');
    const isSignIn = firebase.auth().isSignInWithEmailLink(window.location.href);
    const signIn = firebase.auth().signInWithEmailLink(email, window.location.href);

    if (!isSignIn || !signIn) {
      setError('404');
      return;
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('Verify', user);
        window.location.href = `messages/${user.uid}`;
      } else {
        console.log('Sem usuário');
      }
    });
  }, []);

  return (
    <div className="App">
      { error ? '404' : 'Verificando...'}
    </div>
  );
}

export default Verify;
