const SET_ACTIONS = {
  location: 'SET_LOCATION',
  token: 'SET_TOKEN',
  place: 'SET_PLACE',
  history: 'SET_RECENT_LOCATIONS',
  app: 'SET_APP_READY',
  directions: 'SET_DIRECTIONS',
  bounds: 'SET_BOUNDS'
};
const CLEAN_ACTIONS = {
  location: 'CLEAN_LOCATION',
  place: 'CLEAN_PLACE',
  directions: 'CLEAN_DIRECTIONS',
  bounds: 'CLEAN_BOUNDS'
};

export const setAction = (type, payload) => {
  return { type: SET_ACTIONS[type], payload };
};
export const cleanAction = (type) => {
  return { type: CLEAN_ACTIONS[type] };
};
