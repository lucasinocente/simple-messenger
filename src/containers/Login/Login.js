import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Page from '../../components/Page/Page';
import LoginForm from '../../components/LoginForm/LoginForm';

import './Login.css';

const Login = () => {
  const heroMessage = (
    <>
     <h1 className="title">
        Sign In to talk with 
        admin@admin.com
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