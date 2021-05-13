import firebase from 'firebase/app';
import {
  EDIT_EMAIL,
  EDIT_PROFILE,
  GET_USER,
  LOG_IN,
  LOG_OUT,
  NEW_USER,
  PASSWORD_RESET,
  PROFILE_PICTURE,
  UPDATE_PASSWORD,
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

export const updateProfile = (editUser, setErrorM) => async (dispatch) => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: editUser.displayName,
  })
    .then(() => dispatch({
      type: EDIT_PROFILE,
      payload: editUser.displayName,
    }))
    .catch((error) => setErrorM(error.message));
};

export const updateEmail = (email, setErrorM) => (dispatch) => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  user.updateEmail(email)
    .then(() => console.log('email updated'))
    .catch((error) => setErrorM(error.message));
  return dispatch({
    type: EDIT_EMAIL,
    payload: user,
  });
};

export const profilePicture = (picture, platform, setErrorM, setProgress) => async (dispatch) => {
  firebaseClient();
  // eslint-disable-next-line no-unused-vars
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child(`images/${user.uid}/${Date.now()}.jpg`);
  let uploadTask;
  if (platform !== 'android') {
    const base64 = picture.substring(picture.indexOf(',') + 1);
    uploadTask = imagesRef.putString(base64, 'base64');
  } else {
    console.log('here');
    const response = await fetch(picture);
    const blob = await response.blob();
    uploadTask = imagesRef.put(blob);
  }
  uploadTask.on('state_changed', (snapshot) => {
    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(percentage);
  }, (error) => setErrorM(error.message), () => {
    imagesRef.getDownloadURL()
      .then((url) => {
        user.updateProfile({
          photoURL: url,
        });
        dispatch({
          type: PROFILE_PICTURE,
          payload: url,
        });
      });
  });
};

// password functions not implemented
export const updatePassword = (password, setErrorM) => (dispatch) => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  user.updatePassword(password)
    .then(() => console.log('passwordupdated'))
    .catch((error) => setErrorM(error.message));

  return dispatch({
    type: UPDATE_PASSWORD,
    payload: true,
  });
};

export const sendPasswordReset = (email, setErrorM) => (dispatch) => {
  firebaseClient();
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => setErrorM(error.message));
  return dispatch({
    type: PASSWORD_RESET,
    payload: true,
  });
};
