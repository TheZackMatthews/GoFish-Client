export interface StateUser {
  uid: string | null,
  email: string | null,
  displayName: string | null,
  photoURL: string | null,
  phoneNumber: string | null,
  creationTime: string | null,
  lastSignInTime: string | null,
}

export interface StateLocation {
  latitude: number,
  longitude: number,
}

export interface StatePhoto {
  surveyId?: string,
  category: string,
  comment: string,
  uri: string,
}

export interface StateVisit {
  group_id: string,
    creek_name: string,
    team_lead: string,
    team_members: string[],
    started_at: string,
    ended_at: string,
    distance_walked: number,
    visibility: number,
    view_condition: number,
    water_condition: number,
    flow_type: number,
    day_end_comments: string,
    start_location: {
      latitude: number,
      longitude: number,
    },
    end_location: {
      latitude: number,
      longitude: number,
    },
    pins: StatePin[],
    images: object[] | null,
}

export interface StatePin {
  id: string,
    location: {
      latitude: number,
      longitude: number,
    },
    fish_status: string,
    fish_species: string,
    fish_count: number,
    images: StatePhoto[] | null,
    comments: string,
}

export interface DefaultRootState {
  user: StateUser,
  visit: StateVisit,
  camera: any[],
  pin: StatePin,
  theme: string,
  cache: any[]
}