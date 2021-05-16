import { TOGGLE_FONT } from '../actions/actionTypes';

const themeReducer = (state = 'regular', { type }) => {
  switch (type) {
    case TOGGLE_FONT:
      if (state === 'regular') return 'large';
      return 'regular';
    default:
      return state;
  }
};

export default themeReducer;
