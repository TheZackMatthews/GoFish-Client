import { LOG_IN, LOG_OUT, NEW_USER } from "./actionTypes";
import { firebaseClient } from "../../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

// login action
export const logInUser = (email, password, setErrorM) => (dispatch) => {
  console.log("redux");
  firebaseClient();
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=>{
      return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) =>
        dispatch({
          type: LOG_IN,
          payload: {
            uid: result.user.uid,
            email: result.user.email,
          },
        })
      )
      .catch((error) => {
        const message = error.message;
        setErrorM(message);
      });    
    })
    .catch(error => setErrorM(error.message))
  
};

// logout action
export const logOutUser = (setErrorM) => (dispatch) => {
  firebaseClient();
  return firebase
    .auth()
    .signOut()
    .then(() =>
      dispatch({
        type: LOG_OUT,
        payload: true,
      })
    )
    .catch((error) => setErrorM(error.message));
};

// create user action
export const createUser = (signUp, setErrorM) => (dispatch) => {
  const { email, password } = signUp;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) =>
      dispatch({
        type: NEW_USER,
        payload: {
          uid: result.user.uid,
          email: result.user.email,
        },
      })
    )
    .catch((error) => {
      const message = error.message;
      setErrorM(message);
    });
};

// get user (if authenticated but user is not in redux)
export const getUser = () => (dispatch) => {
  firebaseClient();
  return firebase.auth().onIdTokenChanged();
};
