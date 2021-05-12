import * as MediaLibrary from 'expo-media-library';
import { SAVE_PHOTO } from "./actionTypes";
import { firebaseClient } from "../../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/storage";

export const savePhotoToCameraRoll = (photo) => (dispatch) => (
  MediaLibrary.createAssetAsync(photo.uri)
    .then((res) => {
      dispatch({
        type: SAVE_PHOTO,
        payload: res,
      });
    })
);

export const savePhotoToFB = (user, photo) => dispatch => {
  firebaseClient();
  // console.log(photo)
  const storageRef = firebase.storage().ref();
  const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1)
  const imageRef = storageRef.child(`${user.uid}.${Date.now()}.${filename}`);
  // const message = `data:image/jpg;base64, ${filename}`

  imageRef.putFile(filename).then(snapshot => {
    console.log(snapshot)
    console.log('uploaded!')
  })

  // let URL = imageRef.getDownloadURL((url, error) => {
  //   if (error) console.log(error);
  //   else return url;
  // })

  // console.log(URL)
  
  return dispatch({
    type: SAVE_PHOTO,
    payload: true,
  })
}