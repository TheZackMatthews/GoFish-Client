import {
  NEW_FIELD_VISIT,
  SAVE_VISIT,
  UPDATE_VISIT,
  REMOVE_VISIT,
  CREATE_PIN,
  UPDATE_PIN,
  REMOVE_PIN,
  COMPLETE_PIN,
  SAVE_TO_ROLL,
} from '../actions/actionTypes';
import { defaultVolunteer } from '../defaultState';

// visit reducer
const visitReducer = (state = defaultVolunteer, { type, payload }) => {
  switch (type) {
    case NEW_FIELD_VISIT:
      return {
        ...defaultVolunteer,
        group_id: payload.group_id,
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
    case SAVE_VISIT:
      return payload;
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
    case SAVE_TO_ROLL:
      return {
        ...state,
        images: state.images.concat(payload),
      };
    case REMOVE_PIN:
      return '';
    default:
      return state;
  }
};

export { visitReducer, pinReducer };
