import { NEW_FIELD_VISIT, UPDATE_ENTRY, SAVE_SURVEY } from '../actions/actionTypes'

// survey reducer

export const surveyReducer = (state = '', { type, payload }) => {
  switch (type) {
    case NEW_FIELD_VISIT:
      return payload;
    case UPDATE_ENTRY:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case SAVE_SURVEY:
      return payload;
    default:
      return state;
  }
}
