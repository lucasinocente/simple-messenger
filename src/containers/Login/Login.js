import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/Firebase';
import "firebase/auth";

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('Usuário', user);
        window.location.pathname = `messages/${user.uid}`;
      } else {
        console.log('Sem usuário');
      }
    });

  }, []);

  const sendAuthLinkToEmail = async (event, email) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:3000/verify',
      handleCodeInApp: true
    };

    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('simpleMessengerEmail', email);
      setMessage('E-mail enviado');
    } catch (err) {
      setMessage('Erro');
      console.log(err);
    }
  }

  return (
    <div className="App">
      <section className="container row">
        Login
        <form onSubmit={(event) => sendAuthLinkToEmail(event, email)}>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" > Autenticar </button>
        </form>
        {message}
      </section>
    </div>
  )
}

export default Login;
