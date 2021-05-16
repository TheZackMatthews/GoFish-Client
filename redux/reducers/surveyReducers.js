import {
  NEW_FIELD_VISIT,
  UPDATE_ENTRY,
  SAVE_SURVEY,
  SUBMIT_LOCATION,
  UPDATE_VISIT,
  REMOVE_VISIT,
  CREATE_PIN,
  UPDATE_PIN,
  REMOVE_PIN,
  COMPLETE_PIN,
} from '../actions/actionTypes';
import { defaultVolunteer } from '../defaultState';

// survey reducer

const surveyReducer = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_ENTRY:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case SAVE_SURVEY:
      return payload;
    case SUBMIT_LOCATION:
      return payload;
    default:
      return state;
  }
};

// visit reducer
const visitReducer = (state = defaultVolunteer, { type, payload }) => {
  switch (type) {
    case NEW_FIELD_VISIT:
      return {
        ...defaultVolunteer,
        volunteersId: payload.volunteersId,
        creek_name: payload.creek_name,
        team_lead: payload.team_lead,
        team_members: payload.team_members,
        started_at: payload.started_at,
        start_location: payload.start_location,
      };
    case UPDATE_VISIT:
      return {
        ...state,
        ...payload,
      };
    case REMOVE_VISIT:
      return payload;
    case COMPLETE_PIN:
      return {
        ...state,
        pins: state.pins.concat(payload),
      };
    default:
      return state;
  }
};

// pin reducer
const pinReducer = (state = '', { type, payload }) => {
  switch (type) {
    case CREATE_PIN:
      return payload;
    case UPDATE_PIN:
      return {
        ...state,
        ...payload,
      };
    case REMOVE_PIN:
      return '';
    default:
      return state;
  }
};

export { visitReducer, pinReducer, surveyReducer };
