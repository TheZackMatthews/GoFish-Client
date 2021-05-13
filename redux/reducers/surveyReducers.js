import {
  NEW_FIELD_VISIT,
  UPDATE_ENTRY,
  SAVE_SURVEY,
  SUBMIT_LOCATION,
} from '../actions/actionTypes';

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

export default surveyReducer;
