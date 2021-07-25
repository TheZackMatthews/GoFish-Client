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
  EDIT_PHONE,
} from './actionTypes';
import { Action, Dispatch, Unsubscribe } from 'redux';
import { firebaseClient } from '../../auth/firebaseClient';
import 'firebase/auth';
const { API } = require('../../.env.json')
// import { API } from '../../.env.json';
import axios from 'axios';

interface UserProps {
  email: string,
  password: string,
}

interface DispatchProps extends Action {
  type: string,
  payload: any,
}

interface UserCredential {
  uid: string,
  email: string,
  displayName: string,
  photoUrl: string,
  phoneNumber: string,
}

// login action
export const logInUser = ({email, password}: UserProps) => (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          return dispatch({
            type: LOG_IN,
            payload: {
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              creationTime: result.user.metadata.creationTime,
              lastSignInTime: result.user.metadata.lastSignInTime,
            }
          })
        } else throw new Error
      })
      .catch((error) => dispatch({
        type: LOG_IN,
        payload: { error: error.message },
      }))
    )
    .catch((error) => dispatch({
      type: LOG_IN,
      payload: { error: error.message },
    }))
};

// logout action
export const logOutUser = () => (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  return firebase
    .auth()
    .signOut()
    .then(() => dispatch({
      type: LOG_OUT,
      payload: true,
    }))
    .catch((error) => dispatch({
      type: LOG_OUT,
      payload: { error: error.message },
    }))
};

interface SignUpProps {
  email: string,
  password: string,
  name: string,
}

// create user action
// add link to database
export const createUser = (signUp: SignUpProps) => (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  const { email, password, name } = signUp;
  firebaseClient();
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      if (result && result.user) {
        return axios.post(`${API}user`, {
          uid: result.user.uid,
          email,
          name,
        })
          .then((res) => {
            return dispatch({
              type: NEW_USER,
              payload: {
                uid: result.user!!.uid,
                email: result.user!!.email,
                displayName: result.user!!.displayName,
                photoURL: result.user!!.photoURL,
                creationTime: result.user!!.metadata.creationTime,
                lastSignInTime: result.user!!.metadata.lastSignInTime,
              }
            })
          })
          .catch((error) => dispatch({
            type: NEW_USER,
            payload: { uid: '', error: error.message }
          }))
      } else {
        return dispatch({
          type: NEW_USER,
          payload: {
            uid: '',
          }
        })
      }
    })
    .catch((error) => dispatch({
      type: NEW_USER,
      payload: { error: error.message }
    }))


};

// get user (if authenticated but user is not in redux)
export const getUser = () => (dispatch: Dispatch<DispatchProps>): Unsubscribe => {
  firebaseClient();
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      axios.get(`${API}user/${user.uid}`)
        .then((res) => dispatch({
            type: GET_USER,
            payload: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              phoneNumber: res.data.phone_number,
              totalVisits: res.data.total_visits,
              creationTime: user.metadata.creationTime,
              lastSignInTime: user.metadata.lastSignInTime,
            }
          })
        )
        .catch((error) => dispatch({
          type: GET_USER,
          payload: { error: error.message }
        }))
    } else return dispatch({
      type: GET_USER,
      payload: '',
    });
  })
}

interface EditProps {
  displayName?: string,
  email?: string,
}
// add link to database
export const updateProfile = (displayName: string) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  if (user) {
      return user.updateProfile({
        displayName,
      })
        .then(() => dispatch({
          type: EDIT_PROFILE,
          payload: displayName,
        }))
        .catch((error) => dispatch({
          type: EDIT_PROFILE,
          payload: { error: error.message }
        }));
    } else return dispatch({
    type: EDIT_PROFILE,
    payload: { error: 'User not found' }
  })
};

export const updatePhone = (phoneNumber: string) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  const user = firebase.auth().currentUser;
  if (user) {
    return axios.put(`${API}user`, {
      uid: user.uid,
      update: {
        phone_number: phoneNumber,
      }
    })
      .then((res) => {
        return dispatch({
          type: EDIT_PHONE,
          payload: {
            phoneNumber: res.data.phone_number
          },
        })
      })
      .catch((error) => dispatch({
        type: EDIT_PHONE,
        payload: { error: error.message }
      }))
  } else {
    return Promise.resolve(dispatch({
      type: EDIT_PHONE,
      payload: { error: 'User not found' }
    }))
  }
}

export const updateEmail = (email: string) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  if (user) {
    return user.updateEmail(email)
      .then(() => dispatch({
        type: EDIT_EMAIL,
        payload: user,
      }))
      .catch((error) => dispatch({
        type: EDIT_EMAIL,
        payload: { error: error.message }
      }));
  } else {
    return dispatch({
      type: EDIT_EMAIL,
      payload: { error: 'User not found' }
    })
  }
};

interface ProfilePicProps {
  picture: string,
  platform: any,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
}

export const profilePicture = ({picture, platform, setProgress}: ProfilePicProps) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  // eslint-disable-next-line no-unused-vars
  const user = firebase.auth().currentUser;
  if (user) {
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child(`images/${user.uid}/${Date.now()}.jpg`);
    let uploadTask;
    if (platform !== 'android') {
      const base64 = picture.substring(picture.indexOf(',') + 1);
      uploadTask = imagesRef.putString(base64, 'base64');
    } else {
      const response = await fetch(picture);
      const blob = await response.blob();
      uploadTask = imagesRef.put(blob);
    }
    uploadTask.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    }, (error) => dispatch({
      type: PROFILE_PICTURE,
      payload: error.message,
    }), () => {
      return imagesRef.getDownloadURL()
        .then((url) => {
          user.updateProfile({
            photoURL: url,
          });
          return dispatch({
            type: PROFILE_PICTURE,
            payload: url,
          });
        });
    });
    return dispatch({
      type: PROFILE_PICTURE,
      payload: 'waiting'
    })
  } else return dispatch({
    type: PROFILE_PICTURE,
    payload: 'User not found',
  })
};

export const updatePassword = (password: string) => (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  const user = firebase.auth().currentUser;
  if (user) {
    return user.updatePassword(password)
      .then(() => dispatch({
        type: UPDATE_PASSWORD,
        payload: true,
      }))
      .catch((error) => dispatch({
        type: UPDATE_PASSWORD,
        payload: { error: error.message }
      }));
} else {
  return Promise.resolve(dispatch({
      type: UPDATE_PASSWORD,
      payload: { error: 'User not found' }
    }))
  }
};

export const sendPasswordReset = (email: string) => (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  firebaseClient();
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => dispatch({
      type: PASSWORD_RESET,
      payload: { message: 'Email has been sent' },
    }))
    .catch((error) => dispatch({
      type: PASSWORD_RESET,
      payload: { error: error.message },
    }));
};
