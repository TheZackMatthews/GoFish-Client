// auth/login action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const NEW_USER = 'NEW_USER';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

// profile actions (user)
export const GET_USER = 'GET_USER';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_EMAIL = 'EDIT_EMAIL';
export const PROFILE_PICTURE = 'PROFILE_PICTURE';

// survey action types
export const NEW_FIELD_VISIT = 'NEW_FIELD_VISIT'; // Save Volunteer group; returns an ID we need
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const SAVE_SURVEY = 'SAVE_SURVEY';

// picture action types
export const SAVE_PHOTO = 'SAVE_PHOTO';
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO';

// map action types

// local storage action types
export const CREATE_VISIT = 'CREATE_VISIT';
export const UPDATE_VISIT = 'UPDATE_VISIT';
export const CREATE_PIN = 'CREATE_PIN';
export const UPDATE_PIN = 'UPDATE_PIN';
export const REMOVE_VISIT = 'REMOVE_VISIT';
export const REMOVE_PIN = 'REMOVE_PIN';
