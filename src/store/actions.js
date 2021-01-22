const SET_ACTIONS = {
  location: 'SET_LOCATION',
  token: 'SET_TOKEN',
};
const CLEAN_ACTIONS = {
  location: 'CLEAN_LOCATION',
  token: 'CLEAN_TOKEN'
};

export const setAction = (type, payload) => {
  return { type: SET_ACTIONS[type], payload };
};
export const cleanAction = (type) => {
  return { type: CLEAN_ACTIONS[type] };
};
