const SET_ACTIONS = {
  location: 'SET_LOCATION',
};
const CLEAN_ACTIONS = {
  location: 'CLEAN_LOCATION',
};

export const setAction = (type, payload) => {
  return { type: SET_ACTIONS[type], payload };
};
export const cleanAction = (type) => {
  return { type: CLEAN_ACTIONS[type] };
};
