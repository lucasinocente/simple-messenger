import React, { useEffect } from 'react';
import firebase from '../../firebase/Firebase';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import LoginForm from '../../components/LoginForm/LoginForm';
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

  
  return (
    <>
      <Header />
      <Hero />
      <LoginForm />
    </>
  )
}

export default Login;
