export const defaultUser = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  phoneNumber: '',
  lastSignInTime: '',
  creationTime: '',
};

export const defaultSurvey = {
  id: '',
  location: '',
  fish_status: '',
  fish_species: '',
  fish_count: '',
  image_object: {
    url: '',
    comments: '',
  },
  comments: '',
};

export const defaultVolunteer = {
  volunteerId: '',
  creek_name: '',
  team_lead: '',
  team_members: [''],
  started_at: '',
  ended_at: '',
  distance_walked: 0,
  water_condition: 0,
  view_condition: 0,
  day_end_comments: '',
  start_location: '',
  end_location: '',
};
