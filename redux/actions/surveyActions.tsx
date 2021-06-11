/* eslint-disable no-console */
import axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
// eslint-disable-next-line import/no-unresolved
import { API } from '../../.env.json';
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
import { Action, Dispatch } from 'redux';
import { savePhotoToFB } from './cameraActions';
import { defaultLocation, defaultVisit, defaultPin } from '../defaultState';
import { StateLocation, StateVisit, StatePhoto, StatePin } from '../../interfaces/state';

// creek_name: string, team_lead: string, team_members: string[]
interface SurveyProps {
  creek_name: string,
  team_lead: string,
  team_members: string[],
}

interface DispatchProps extends Action {
  type: string,
  payload: any,
}
export const initializeFieldVisit = ({creek_name, team_lead, team_members}: SurveyProps) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  let location: StateLocation = defaultLocation;

  if (status === 'granted') {
    let tempLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    location.longitude = tempLocation.coords.longitude;
    location.latitude = tempLocation.coords.latitude;
  } 

  return axios.post(`${API}visit`, {creek_name, team_lead, team_members})
    .then((response) => dispatch({
      type: NEW_FIELD_VISIT,
      payload: {
        ...defaultVisit,
        group_id: response.data.group_id,
        creek_name,
        team_lead,
        team_members,
        started_at: response.data.startedAt,
        start_location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    }))
    .catch((error) => {
      console.log(error);
      return {
        type: NEW_FIELD_VISIT,
        payload: error.message,
      };
    });
};

export const submitLocation = (coordinates: StateLocation) => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: SUBMIT_LOCATION,
  payload: coordinates,
});

export const updateFieldVisit = (fieldVisit: StateVisit) => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: UPDATE_VISIT,
  payload: fieldVisit,
});

export const saveVisit = (fieldVisit: StateVisit) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  try {
    const sendVisit = {
      group_id: fieldVisit.group_id,
      distanceWalked: fieldVisit.distance_walked,
      waterCondition: fieldVisit.water_condition,
      viewCondition: fieldVisit.view_condition,
      dayEndComments: fieldVisit.day_end_comments,
      visibility: fieldVisit.visibility,
      flowType: fieldVisit.flow_type,
    };
    await axios.put(`${API}visit`, sendVisit);

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
      surveys.push(axios.post(`${API}survey`, sendPin));
    }
    interface SendPhoto {
      surveyId: string,
      photo: StatePhoto,
    }
    Promise.all(surveys)
      .then((values) => {
        for (let j = 0; j < values.length; j += 1) {
          const { id } = values[j].data;
          const pinImages: StatePhoto[]|null = fieldVisit.pins[j].images;
          if (pinImages !== null) {
            for (let k = 0; k < pinImages.length; k += 1) {
              const sendPhoto: SendPhoto = {
                surveyId: id,
                photo: {
                  category: pinImages[k].category,
                  comment: pinImages[k].comment,
                  uri: pinImages[k].uri,
                }
              }
              savePhotoToFB(sendPhoto, fieldVisit);
            }
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
      payload: [fieldVisit],
    });
  }
};

// on logout
export const removeVisit = () => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
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
      payload: defaultVisit,
    });
  } catch (error) {
    return error;
  }
};

export const createPin = (location: StateLocation) => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
  const pin = defaultPin;
  let startLocation = location;
  try {
    if (!location) {
      let tempLocation: any = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      startLocation.latitude = tempLocation.coords.latitude;
      startLocation.longitude = tempLocation.coords.longitude;
    } 
    pin.location = startLocation;
  } catch (error) {
    console.log(error);
    pin.location = defaultLocation
  }
  return dispatch({
    type: CREATE_PIN,
    payload: pin,
  });
};

export const updatePin = (pin: StatePin) => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: UPDATE_PIN,
  payload: pin,
});

export const completePin = (pin: StatePin) => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: COMPLETE_PIN,
  payload: pin,
});

// on logout
export const removePin = () => async (dispatch: Dispatch<DispatchProps>): Promise<Action> => {
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
