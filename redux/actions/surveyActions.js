/* eslint-disable no-console */
import axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import {
  NEW_FIELD_VISIT,
  SUBMIT_LOCATION,
  SAVE_VISIT,
  CREATE_PIN,
  UPDATE_PIN,
  UPDATE_VISIT,
  REMOVE_PIN,
  REMOVE_VISIT,
  COMPLETE_PIN,
} from './actionTypes';
import { defaultVolunteer, defaultPin } from '../defaultState';

const API = 'https://gofish-api.herokuapp.com/';

// creek_name: string, team_lead: string, team_members: string[]
export const initializeFieldVisit = (creekName, teamLead, teamMembers) => async (dispatch) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  let location;
  try {
    if (status !== 'granted') location = null;
    else location = await Location.getCurrentPositionAsync({});
  } catch (error) {
    console.log(error);
    location = null;
  }

  console.log(location);
  const volunteers = {
    creekName,
    teamLead,
    teamMembers,
  };
  console.log('about to make axios call');
  axios.post(`${API}saveVolunteers`, volunteers)
    .then((response) => {
      console.log('response', response.data);
      return dispatch({
        type: NEW_FIELD_VISIT,
        payload: {
          ...defaultVolunteer,
          volunteersId: response.data.volunteersId,
          creek_name: creekName,
          team_lead: teamLead,
          team_members: teamMembers,
          started_at: response.data.startedAt,
          start_location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      });
    })
    .catch((error) => console.log(error));
};

export const submitLocation = (coordinates) => (dispatch) => dispatch({
  type: SUBMIT_LOCATION,
  payload: coordinates,
});

export const updateFieldVisit = (fieldVisit) => (dispatch) => dispatch({
  type: UPDATE_VISIT,
  payload: fieldVisit,
});

export const saveVisit = (fieldVisit) => async (dispatch) => {
  try {
    const sendVisit = {
      volunteersId: fieldVisit.volunteersId,
      distanceWalked: fieldVisit.distance_walked,
      waterCondition: fieldVisit.water_condition,
      viewCondition: fieldVisit.view_condition,
      dayEndComments: fieldVisit.day_end_comments,
    };
    const result = await axios.put(`${API}saveVolunteers`, sendVisit);
    console.log(result);

    const surveys = [];
    for (let i = 0; i < fieldVisit.pins.length; i += 1) {
      const sendPin = {
        survey: {
          location: fieldVisit.pins[i].location,
          fish_status: fieldVisit.pins[i].fish_status,
          fish_species: fieldVisit.pins[i].fish_species,
          fish_count: fieldVisit.pins[i].fish_count,
          image_url: 'test',
          comments: fieldVisit.pins[i].comments,
        },
        volunteersId: fieldVisit.volunteersId,
      };
      console.log(sendPin)
      surveys.push(axios.post(`${API}saveSurvey`, sendPin));
    }
    await Promise.all(surveys);
    console.log(surveys);
    return dispatch({
      type: SAVE_VISIT,
      payload: '',
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: SAVE_VISIT,
      payload: fieldVisit,
    });
  }
};

// on logout
export const removeVisit = () => async (dispatch) => {
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    await LocalStorage.removeItem('fieldVisit');
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
  let startLocation = location;
  if (!location) {
    startLocation = await Location.getCurrentPositionAsync({});
  }
  pin.location = {
    latitude: startLocation.coords.latitude,
    longitude: startLocation.coords.longitude,
  };
  return dispatch({
    type: CREATE_PIN,
    payload: pin,
  });
};

export const updatePin = (pin) => async (dispatch) => dispatch({
  type: UPDATE_PIN,
  payload: pin,
});

export const completePin = (pin) => (dispatch) => dispatch({
  type: COMPLETE_PIN,
  payload: pin,
});

// on logout
export const removePin = () => async (dispatch) => {
  let LocalStorage;
  if (Platform.OS === 'android') {
    LocalStorage = AsyncStorage;
  } else {
    LocalStorage = window.localStorage;
  }
  try {
    await LocalStorage.removeItem('pin');
    return dispatch({
      type: REMOVE_PIN,
      payload: true,
    });
  } catch (error) {
    return error;
  }
};
