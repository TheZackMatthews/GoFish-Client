export const defaultUser = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  phoneNumber: null,
  lastSignInTime: '',
  creationTime: '',
};

export const defaultPin = {
  id: '',
  location: {
    latitude: 0,
    longitude: 0,
  },
  fish_status: '',
  fish_species: '',
  fish_count: 0,
  images: null,
  comments: '',
};

export const defaultLocation = {
  latitude: 0,
  longitude: 0,
}

export const defaultVisit = {
  group_id: '',
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
    latitude: 0,
    longitude: 0,
  },
  end_location: {
    latitude: 0,
    longitude: 0,
  },
  pins: [],
  images: [],
};

export const defaultCamera = [''];

export const defaultTheme = 'regular';

export const initialState = {
  user: defaultUser,
  pin: defaultPin,
  visit: defaultVisit,
  camera: defaultCamera,
  theme: defaultTheme,
  cache: [],
};
