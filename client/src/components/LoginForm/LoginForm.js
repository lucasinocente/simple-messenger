import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import firebase from '../../firebase/Firebase';

import './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  const sendAuthLinkToEmail = async (event, email) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:3000/verify',
      handleCodeInApp: true
    };
    setIsLoading(true);
    setNotification('');

    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('simpleMessengerEmail', email);
      setNotification('E-mail enviado!');
    } catch (err) {
      setNotification('Erro');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={ev => sendAuthLinkToEmail(ev, email)}>
        <div className="field">
          <label className="label">Para fazer login, preencha seu e-mail abaixo e entre no link que enviaremos para você:</label>
          <div className="control">
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="E-mail"
              className="input"
              pattern={emailPattern}
              autoComplete="true"
              autoFocus
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button 
              type="submit" 
              className="button is-info"
            >
              {
                isLoading 
                ? <Loader /> 
                : notification
                  ? notification
                  : 'Fazer login via e-mail'
              }
            </button>
          </div>
        </div>
      </form>
    </>
  )
};

export default LoginForm;