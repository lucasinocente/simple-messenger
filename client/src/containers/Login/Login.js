import React, { useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Page from '../../components/Page/Page';
import LoginForm from '../../components/LoginForm/LoginForm';

import { Context } from '../../StoreProvider';

import './Login.scss';

const Login = (props) => {
  console.log(props)
  useEffect(() => {
    if (props.user) window.location.pathname = `messages/${props.user.uid}`;
  }, [props.user]);

  return (
    <>
      <Header />
      <Page>
        <Hero content={(
          <h1 className="title">
            Faça login para falar com Lucas Inocente
          </h1>
        )} />
        <LoginForm />
      </Page>
    </>
  )
}

export default props =>
  <Login 
    {...useContext(Context)}
    {...props}
  />;