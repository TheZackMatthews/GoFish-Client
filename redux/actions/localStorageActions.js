import { Platform, AsyncStorage } from 'react-native';
import {
  CREATE_PIN,
  CREATE_VISIT,
  UPDATE_PIN,
  UPDATE_VISIT,
  REMOVE_PIN,
  REMOVE_VISIT,
  GET_VISIT,
} from './actionTypes';
import { defaultVolunteer, defaultPin } from '../defaultState';

export const createFieldVisit = (location) => async (dispatch) => {
  const fieldVisit = defaultVolunteer;
  fieldVisit.start_location = location;
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    await LocalStorage.setItem('fieldVisit', JSON.stringify(fieldVisit));
    return dispatch({
      type: CREATE_VISIT,
      payload: fieldVisit,
    });
  } catch (error) {
    return error;
  }
};

// I think this is unnessessary now that redux persist is set up
export const getFieldVisit = () => async (dispatch) => {
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    const result = await LocalStorage.getItem('fieldVisit');
    return dispatch({
      type: CREATE_VISIT,
      payload: result,
    });
  } catch (error) {
    return error;
  }
};

export const updateFieldVisit = (fieldVisit) => async (dispatch) => {
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    await LocalStorage.mergeItem('fieldVisit', JSON.stringify(fieldVisit));
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
    await localStorage.removeItem('fieldVisit');
    return dispatch({
      type: REMOVE_VISIT,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};

export const createPin = (location) => async (dispatch) => {
  const pin = defaultPin;
  pin.location = location;
  try {
    await localStorage.setItem('pin', JSON.stringify(pin));
    return dispatch({
      type: CREATE_PIN,
      payload: pin,
    });
  } catch (error) {
    return error;
  }
};

export const getPin = () => async (dispatch) => localStorage.getItem('pin')
  .then(((value) => (
    dispatch({
      type: GET_VISIT,
      payload: value,
    })
  )));

export const updatePin = (pin) => async (dispatch) => dispatch({
  type: UPDATE_PIN,
  payload: pin,
});
// let LocalStorage;
// console.log(pin)
// if (Platform.OS === 'android') {
//   LocalStorage = AsyncStorage;
// } else {
//   LocalStorage = window.localStorage;
// }
// try {
//   await LocalStorage.mergeItem('pin', JSON.stringify(pin));
//   return dispatch({
//     type: UPDATE_PIN,
//     payload: pin,
//   });
// } catch (error) {
//   return error;
// }

export const removePin = () => async (dispatch) => {
  try {
    await localStorage.removeItem('pin');
    return dispatch({
      type: REMOVE_PIN,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};
