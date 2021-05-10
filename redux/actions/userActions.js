import { GET_FB_USER } from "./actionTypes";
import { firebaseClient } from "../../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

// login action
export const logInUser = (email, password) => (dispatch) => {
  console.log('redux')
  firebaseClient();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      dispatch({
        type: GET_FB_USER,
        payload: result,
      });
    });
};
