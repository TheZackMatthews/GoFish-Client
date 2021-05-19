import { SAVE_PHOTO, SAVE_TO_FB } from '../actions/actionTypes';

// camera reducer
const cameraReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SAVE_PHOTO:
      return [];
    case SAVE_TO_FB:
      return [...state, payload];
    default:
      return state;
  }
};

export default cameraReducer;
