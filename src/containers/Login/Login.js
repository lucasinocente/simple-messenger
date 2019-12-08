import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Page from '../../components/Page/Page';
import LoginForm from '../../components/LoginForm/LoginForm';

import firebase from '../../firebase/Firebase';
import "firebase/auth";

import './Login.css';

const Login = () => {

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) window.location.pathname = `messages/${user.uid}`;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const heroMessage = (
    <>
     <h1 className="title">
        Faça login para falar com Lucas Inocente
      </h1>
      <h2 className="subtitle">
        Para fazer login, preencha seu e-mail abaixo e entre no link que enviaremos para você.
      </h2>
    </>
  );

  return (
    <>
      <Header />
      <Page>
        <Hero content={heroMessage} />
        <LoginForm />
      </Page>
    </>
  )
}

export default Login;