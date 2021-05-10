import { combineReducers } from 'redux';
import { surveyReducer } from './surveyReducers';
import { userReducer } from './userReducers'

const reducers = {
  user: userReducer,
  survey: surveyReducer,
}

export default combineReducers(reducers);