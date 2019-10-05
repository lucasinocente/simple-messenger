import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/Firebase';
import "firebase/auth";

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) window.location.pathname = `messages/${user.uid}`;
      });
    } catch (error) {
      console.log(error);
    }
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
    <div className="container">
      <div className="login-container">
        <h3>Simple Messenger</h3>
        
        <div className="welcome">Bem vindo ao Simple Messenger!</div>
        <div className="welcome">Faça login com o seu e-mail abaixo:</div>
        <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
        />
        <button
            type="button"
            onClick={ev => sendAuthLinkToEmail(ev, email)}
        >
          Fazer login via e-mail
        </button>
        <div className="error">{message}</div>
      </div>
    </div>
  )
}

export default Login;
