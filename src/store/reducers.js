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
    case "SET_TOKEN": {
      const { payload } = action;
      return { ...state, token: payload };
    }
    case "CLEAN_TOKEN": {
      const { token } = initialState;
      return { ...state, token };
    }
    default: return state;
  }
};
