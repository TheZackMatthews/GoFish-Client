import { combineReducers } from 'redux';
import surveyReducer from './surveyReducers';
import userReducer from './userReducers';
import cameraReducer from './cameraReducers';

const reducers = {
  user: userReducer,
  survey: surveyReducer,
  camera: cameraReducer,
};

export default combineReducers(reducers);
