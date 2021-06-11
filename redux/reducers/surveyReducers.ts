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
  FAILED_UPLOAD,
} from '../actions/actionTypes';
import { defaultVisit, defaultPin } from '../defaultState';
import { StateVisit, StatePin } from '../../interfaces/state';

interface Action {
  type: string,
  payload: any,
}

// visit reducer
export const visitReducer = (state: StateVisit = defaultVisit, { type, payload }: Action) => {
  switch (type) {
    case NEW_FIELD_VISIT:
      return {
        ...defaultVisit,
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
export const pinReducer = (state: StatePin = defaultPin, { type, payload }: Action) => {
  switch (type) {
    case CREATE_PIN:
      return payload;
    case UPDATE_PIN:
      return {
        ...state,
        ...payload,
      };
    case SAVE_TO_ROLL:
      if (state.images && state.images.length) {
        return {
          ...state,
          images: state.images.concat(payload),
        };
      } else {
        return {
          ...state,
          images: [payload],
        }
      }
    case REMOVE_PIN:
      return '';
    default:
      return state;
  }
};

// cache for failed uploads
export const cacheReducer = (state = null, { type, payload }: Action) => {
  switch (type) {
    case FAILED_UPLOAD:
      if (state !== null) {
        return [
          ...state!!,
          payload,
        ];
      } else {
        return state;
      }
    default:
      return state;
  }
};
