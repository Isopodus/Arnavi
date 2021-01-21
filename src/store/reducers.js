import initialState from './state';

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "SET_LOCATION": {
      const { payload } = action;
      return { ...state, location: payload };
    }
    case "CLEAN_LOCATION": {
      const { location } = initialState;
      return { ...state, location };
    }
    default: return state;
  }
};
