/* eslint-disable no-console */
import axios from 'axios';
import {
  NEW_FIELD_VISIT, SUBMIT_LOCATION, UPDATE_ENTRY, SAVE_SURVEY,
} from './actionTypes';

// creek_name: string, team_lead: string, team_members: string[]
// eslint-disable-next-line import/prefer-default-export
export const initializeFieldVisit = (creekName, teamLead, teamMembers) => (dispatch) => {
  const volunteers = {
    creekName,
    teamLead,
    teamMembers,
  };
  return dispatch({
    type: NEW_FIELD_VISIT,
    payload: {
      volunteersId: "123456",
      creek_name: creekName,
      team_lead: teamLead,
      team_members: teamMembers,
      started_at: "A few minutes ago",
    },
  });
  // console.log('about to make axios call')
  // axios.post('http://localhost:3001/saveVolunteers', volunteers)
  //   .then((response) => {
  //     console.log('response', response.data);
  //     return dispatch({
  //       type: NEW_FIELD_VISIT,
  //       payload: {
  //         volunteersId: response.data.volunteersId,
  //         creek_name: creekName,
  //         team_lead: teamLead,
  //         team_members: teamMembers,
  //         started_at: response.data.startedAt,
  //       },
  //     });
  //   })
  //   .catch((error) => console.log(error));
};

export const submitLocation = (coordinates) => (dispatch) => dispatch({
  type: SUBMIT_LOCATION,
  payload: coordinates,
});
// export const storeLocation (location) => dispatch => {
//   return dispatch({
//     type: STORE_LOCATION,
//     payload: location,
//   })
// }

