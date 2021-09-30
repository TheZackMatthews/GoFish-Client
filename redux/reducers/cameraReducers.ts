import { SAVE_PHOTO, SAVE_TO_FB } from '../actions/actionTypes';
import { defaultPhoto } from '../defaultState';
import { StatePhoto } from '../../interfaces/state';

interface CameraAction {
  type: string,
  payload: any,
}

const cameraReducer = (state: StatePhoto = defaultPhoto, action: CameraAction) => {
  switch (action.type) {
    case SAVE_PHOTO:
      return defaultPhoto;
    case SAVE_TO_FB:
      return action.payload;
    default:
      return state;
  }
};

export default cameraReducer;
