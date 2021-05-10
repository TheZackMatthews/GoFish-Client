import { GET_FB_USER } from './actionTypes';
import { firebaseClient } from '../../auth/firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

// login action
export const logInUser = async (email, password) => dispatch => {
  firebaseClient();
  let result = await firebase.auth().signInWithEmailAndPassword(email, password)
  dispatch({
    type: GET_FB_USER,
    payload: result,
  })
}