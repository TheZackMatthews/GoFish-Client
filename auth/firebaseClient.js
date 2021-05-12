import firebase from 'firebase/app';
import FB_CONFIG from './firebaseConfig';

export function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FB_CONFIG);
  }
}

export default firebase;
