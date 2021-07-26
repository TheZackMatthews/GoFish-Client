import { TOGGLE_FONT } from '../actions/actionTypes';

interface Action {
  type: string,
  payload: any,
}

const themeReducer = (state: string = 'regular', { type, payload }: Action) => {
  switch (type) {
    case TOGGLE_FONT:
      if (state === 'regular') return 'large';
      return 'regular';
    default:
      return state;
  }
};

export default themeReducer;
