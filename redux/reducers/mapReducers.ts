import { NEW_FIELD_VISIT, UPDATE_ENTRY, SAVE_SURVEY } from '../actions/actionTypes';
import { StateLocation } from '../../interfaces/state'
import { defaultLocation } from '../defaultState';
// survey reducer

interface MapAction {
  type: string,
  payload: any,
}

const mapReducer = (state: StateLocation = defaultLocation, { type, payload }: MapAction) => {
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

    // case SAVE_LOCATION:
    //   return ({
    //     ...state,
    //     location: payload
    //   })
    default:
      return state;
  }
};

export default mapReducer;
