import firebase from 'firebase/app';
import {
  GET_USER, LOG_IN, LOG_OUT, NEW_USER,
} from './actionTypes';
import { firebaseClient } from '../../auth/firebaseClient';
import 'firebase/auth';

// login action
export const logInUser = (email, password, setErrorM) => (dispatch) => {
  firebaseClient();
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => dispatch({
        type: LOG_IN,
        payload: {
          uid: result.user.uid,
          email: result.user.email,
        },
      }))
      .catch((error) => {
        const { message } = error;
        setErrorM(message);
      }))
    .catch((error) => setErrorM(error.message));
};

// logout action
export const logOutUser = (setErrorM) => (dispatch) => {
  firebaseClient();
  return firebase
    .auth()
    .signOut()
    .then(() => dispatch({
      type: LOG_OUT,
      payload: true,
    }))
    .catch((error) => setErrorM(error.message));
};

// create user action
export const createUser = (signUp, setErrorM) => (dispatch) => {
  const { email, password } = signUp;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => dispatch({
      type: NEW_USER,
      payload: {
        uid: result.user.uid,
        email: result.user.email,
      },
    }))
    .catch((error) => {
      const { message } = error;
      setErrorM(message);
    });
};

// get user (if authenticated but user is not in redux)
export const getUser = () => (dispatch) => {
  firebaseClient();
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return dispatch({
        type: GET_USER,
        payload: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        },
      });
    }
    return dispatch({
      type: GET_USER,
      payload: '',
    });
  });
};

export const updateProfile = (setErrorM) => (dispatch) => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: 'Kimberly Innes',
  })
    .then(() => {
      console.log('update successful')
    })
    .catch((error) => {
      console.log(error)
    })
  console.log(user)
};