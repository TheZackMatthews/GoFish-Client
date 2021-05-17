export const defaultUser = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  phoneNumber: '',
  lastSignInTime: '',
  creationTime: '',
};

export const defaultPin = {
  id: '',
  location: '',
  fish_status: '',
  fish_species: '',
  fish_count: 0,
  images: [],
  comments: '',
};

export const defaultVolunteer = {
  volunteersId: '',
  creek_name: '',
  team_lead: '',
  team_members: [''],
  started_at: '',
  ended_at: '',
  distance_walked: 0,
  flow_type: 0,
  water_condition: 0,
  visibility: 0,
  view_condition: 0,
  day_end_comments: '',
  start_location: {
    latitudes: 0,
    longitude: 0,
  },
  end_location: '',
  pins: [],
  images: [
    {
      uri: '',
      comment: '',
    },
  ],
};
