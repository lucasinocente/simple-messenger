import React, { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import firebase from '../../firebase/Firebase';

import './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendAuthLinkToEmail = async (event, email) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:3000/verify',
      handleCodeInApp: true
    };
    setIsLoading(true);
    setMessage('');

    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('simpleMessengerEmail', email);
      setMessage('E-mail enviado');
    } catch (err) {
      setMessage('Erro');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container container-home">
      <div className="login-container">
        <form className="welcome" onSubmit={ev => sendAuthLinkToEmail(ev, email)}>
          <label>Faça login com o seu e-mail abaixo:</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
          />
          <button type="submit">{isLoading ? <Loader /> : 'Fazer login via e-mail'}</button>
        </form>
        <div className="error">{message}</div>
      </div>
    </div>
  )
};

export default LoginForm;