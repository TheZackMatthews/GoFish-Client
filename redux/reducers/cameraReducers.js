import { SAVE_PHOTO } from '../actions/actionTypes'

// camera reducer
export const cameraReducer = (state = '', { type, payload }) => {
  switch (type) {
    case SAVE_PHOTO:
      return payload;
    default:
      return state;
  }
}

