/* eslint-disable no-console */
import axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
// eslint-disable-next-line import/no-unresolved
import { API } from '@env';
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
  FAILED_UPLOAD,
} from './actionTypes';
import { defaultVolunteer, defaultPin } from '../defaultState';
import { savePhotoToFB } from './cameraActions';

// creek_name: string, team_lead: string, team_members: string[]
export const initializeFieldVisit = (creekName, teamLead, teamMembers) => async (dispatch) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  let location;
  try {
    if (status !== 'granted') {
      location = {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      };
    } else {
      location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    }
  } catch (error) {
    console.log(error);
    location = {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  const volunteers = {
    creekName,
    teamLead,
    teamMembers,
  };

  axios.post(`${API}saveVolunteers`, volunteers)
    .then((response) => dispatch({
      type: NEW_FIELD_VISIT,
      payload: {
        ...defaultVolunteer,
        group_id: response.data.group_id,
        creek_name: creekName,
        team_lead: teamLead,
        team_members: teamMembers,
        started_at: response.data.startedAt,
        start_location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      },
    }))
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
      group_id: fieldVisit.group_id,
      distanceWalked: fieldVisit.distance_walked,
      waterCondition: fieldVisit.water_condition,
      viewCondition: fieldVisit.view_condition,
      dayEndComments: fieldVisit.day_end_comments,
    };
    await axios.put(`${API}saveVolunteers`, sendVisit);

    const surveys = [];
    for (let i = 0; i < fieldVisit.pins.length; i += 1) {
      const sendPin = {
        survey: {
          location: fieldVisit.pins[i].location,
          fish_status: fieldVisit.pins[i].fish_status,
          fish_species: fieldVisit.pins[i].fish_species,
          fish_count: fieldVisit.pins[i].fish_count,
          comments: fieldVisit.pins[i].comments,
        },
        group_id: fieldVisit.group_id,
      };
      surveys.push(axios.post(`${API}saveSurvey`, sendPin));
    }
    Promise.all(surveys)
      .then((values) => {
        for (let j = 0; j < values.length; j += 1) {
          const { id } = values[j].data;
          const pinImages = fieldVisit.pins[j].images;
          for (let k = 0; k < pinImages.length; k += 1) {
            const sendPhoto = {
              surveyId: id,
              photo: {
                category: pinImages[k].category,
                comment: pinImages[k].comment,
                uri: pinImages[k].uri,
              },
            };
            dispatch(savePhotoToFB(sendPhoto, fieldVisit));
          }
        }
      });
    return dispatch({
      type: SAVE_VISIT,
      payload: '',
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: FAILED_UPLOAD,
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
      payload: defaultVolunteer,
    });
  } catch (error) {
    return error;
  }
};

export const createPin = (location) => async (dispatch) => {
  const pin = defaultPin;
  let startLocation = location;
  try {
    if (!location) {
      startLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    }
    pin.location = {
      latitude: startLocation.coords.latitude,
      longitude: startLocation.coords.longitude,
    };
  } catch (error) {
    console.log(error);
    pin.location = {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
  }
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
