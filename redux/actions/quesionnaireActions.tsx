import firebase from 'firebase/app';
import {Action, Dispatch} from 'redux';
import axios from 'axios';
import { API } from '../../.env.json';

import { QUEST_USER } from './actionTypes';

interface QuestProps extends Action {
  type: string,
  payload: any,
}

// get the questionnaires available to the user
export const getQuesionnaireByUser = (userUID: string) => async (dispatch: Dispatch<QuestProps>): Promise<Action> => {
  return dispatch({
    type: QUEST_USER,
    payload: 'any',
  })
}