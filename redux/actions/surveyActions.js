import { NEW_FIELD_VISIT, UPDATE_ENTRY, SAVE_SURVEY } from './actionTypes'
 
export const initializeSurvey = (user) => dispatch => {
  // here, we could add the initial info:
  // location info from map for starting location
  // what format do we want the time in?
  return dispatch({
    type: NEW_SURVEY,
    payload: {
      user,
      started_at: Date.now()
    }
  })
}