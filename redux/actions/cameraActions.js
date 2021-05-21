import * as MediaLibrary from 'expo-media-library';
import firebase from 'firebase/app';
import { Platform } from 'react-native';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { API } from '@env';
import { FAILED_UPLOAD, SAVE_PHOTO, SAVE_TO_ROLL } from './actionTypes';
import { firebaseClient } from '../../auth/firebaseClient';
import 'firebase/storage';

export const savePhotoToCameraRoll = (photo) => async (dispatch) => {
  const asset = await MediaLibrary.createAssetAsync(photo.uri);
  return dispatch({
    type: SAVE_TO_ROLL,
    payload: {
      uri: asset.uri,
      comment: photo.comment,
      category: photo.category,
    },
  });
};

export const savePhotoToFB = (photo, visit) => async (dispatch) => {
  firebaseClient();
  const { photo: { category, comment, uri } } = photo;
  const { surveyId } = photo;
  // const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  let uploadTask;
  const imagesRef = storageRef.child(`images/${visit.group_id}/${Date.now()}.jpg`);
  if (Platform.OS !== 'android') {
    const base64 = photo.uri.substring(photo.uri.indexOf(',') + 1);
    uploadTask = imagesRef.putString(base64, 'base64');
  } else {
    const result = await fetch(uri);
    const blob = await result.blob();
    uploadTask = imagesRef.put(blob);
  }
  let resultPhoto;
  uploadTask.on('state_changed', () => {
    console.log('working...');
  }, (error) => {
    console.log(error);
    dispatch({
      type: FAILED_UPLOAD,
      payload: visit,
    });
  }, () => {
    imagesRef.getDownloadURL()
      .then((url) => {
        resultPhoto = {
          surveyId,
          photo: {
            photoURL: url,
            reasonForSubmission: category,
            comment,
          },
        };
        axios.post(`${API}savePhoto`, resultPhoto)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      });
  });
  return dispatch({
    type: SAVE_PHOTO,
    payload: resultPhoto,
  });
};
