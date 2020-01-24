import firebase from '../firebase/Firebase';
import "firebase/auth";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const listenAuthStateChanges = () => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    return firebase.auth().onAuthStateChanged(user => {
      user && dispatch({ type: LOGIN_SUCCESS, user });
    });
  } catch (error) {
    console.warn(error);
    dispatch({ type: LOGIN_ERROR, error });
  }
}
