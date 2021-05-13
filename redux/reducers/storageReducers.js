import {
  CREATE_VISIT,
  UPDATE_VISIT,
  REMOVE_VISIT,
  CREATE_PIN,
  UPDATE_PIN,
  REMOVE_PIN,
  COMPLETE_PIN,
  NEW_FIELD_VISIT,
} from '../actions/actionTypes';
import { defaultVolunteer } from '../defaultState';

// visit reducer
const visitReducer = (state = defaultVolunteer, { type, payload }) => {
  switch (type) {
    case NEW_FIELD_VISIT:
      return {
        ...defaultVolunteer,
        volunteersId: payload,
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
      return 'No active pin.';
    default:
      return state;
  }
};

export { visitReducer, pinReducer };
