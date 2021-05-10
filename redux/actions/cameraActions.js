import { SAVE_PHOTO } from "./actionTypes";
import { firebaseClient } from "../../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/storage";

export const savePhotoToFB = (user, photo) => dispatch => {
  firebaseClient();
  // console.log(photo)
  const storageRef = firebase.storage().ref();
  const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1)
  const imageRef = storageRef.child(`${user.uid}.${Date.now()}.${filename}`);
  
  imageRef.put(filename).then(snapshot => {
    console.log(snapshot)
    console.log('uploaded!')
  })
  
  return dispatch({
    type: SAVE_PHOTO,
    payload: true,
  })
}