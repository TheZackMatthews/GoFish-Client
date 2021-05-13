import { combineReducers } from 'redux';
// import surveyReducer from './surveyReducers';
import userReducer from './userReducers';
import cameraReducer from './cameraReducers';
import { visitReducer, pinReducer } from './storageReducers';

const reducers = {
  user: userReducer,
  camera: cameraReducer,
  visit: visitReducer,
  pin: pinReducer,
};

export default combineReducers(reducers);
