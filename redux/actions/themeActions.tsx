import { TOGGLE_FONT } from './actionTypes';
import { API } from '../../.env.json';
import { Action, Dispatch } from 'redux';

interface DispatchProps extends Action {
  type: string,
  payload: any,
}

export const toggleFont = () => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: TOGGLE_FONT,
  payload: '',
});

export const toggleTheme = () => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: TOGGLE_FONT,
  payload: '',
});

export const setThemeToUser = () => (dispatch: Dispatch<DispatchProps>): Action => dispatch({
  type: TOGGLE_FONT,
  payload: '',
});