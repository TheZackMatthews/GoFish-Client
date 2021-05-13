// import { AsyncStorage } from 'react-native';
import AsyncStorage from 'react-native';
import {
  CREATE_PIN,
  CREATE_VISIT,
  UPDATE_PIN,
  UPDATE_VISIT,
  REMOVE_PIN,
  REMOVE_VISIT,
} from './actionTypes';
import { defaultVolunteer, defaultSurvey } from '../defaultState';

export const createFieldVisit = (location) => async (dispatch) => {
  const fieldVisit = defaultVolunteer;
  fieldVisit.start_location = location;
  try {
    await AsyncStorage.setItem('fieldVisit', JSON.stringify(fieldVisit));
    console.log('here');
    return dispatch({
      type: CREATE_VISIT,
      payload: fieldVisit,
    });
  } catch (error) {
    return error;
  }
};

export const updateFieldVisit = (fieldVisit) => async (dispatch) => {
  try {
    await AsyncStorage.mergeItem('fieldVisit', JSON.stringify(fieldVisit));
    return dispatch({
      type: UPDATE_VISIT,
      payload: fieldVisit,
    });
  } catch (error) {
    return error;
  }
};

export const removeVisit = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('fieldVisit');
    return dispatch({
      type: REMOVE_VISIT,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};

export const createPin = (location) => async (dispatch) => {
  const pin = defaultSurvey;
  pin.location = location;
  try {
    await AsyncStorage.setItem('pin', JSON.stringify(pin));
    return dispatch({
      type: CREATE_PIN,
      payload: pin,
    });
  } catch (error) {
    return error;
  }
};

export const updatePin = (pin) => async (dispatch) => {
  try {
    await AsyncStorage.mergeItem('pin', JSON.stringify(pin));
    return dispatch({
      type: UPDATE_PIN,
      payload: pin,
    });
  } catch (error) {
    return error;
  }
};

export const removePin = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('pin');
    return dispatch({
      type: REMOVE_PIN,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};
