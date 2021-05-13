/* eslint-disable no-console */
import axios from 'axios';
import { NEW_FIELD_VISIT, UPDATE_ENTRY, SAVE_SURVEY } from './actionTypes';

// creek_name: string, team_lead: string, team_members: string[]
// eslint-disable-next-line import/prefer-default-export
export const initializeFieldVisit = (creekName, teamLead, teamMembers) => (dispatch) => {
  const volunteers = {
    creekName,
    teamLead,
    teamMembers,
  };
  axios.post('http://localhost:3001/saveVolunteers', volunteers)
    .then((response) => {
      console.log(response.data);
      return dispatch({
        type: NEW_FIELD_VISIT,
        payload: response.data.data,
      });
    })
    .catch((error) => console.log(error));
};

// export const storeLocation (location) => dispatch => {
//   return dispatch({
//     type: STORE_LOCATION,
//     payload: location,
//   })
// }