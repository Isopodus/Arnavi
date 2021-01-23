import initialState from './state';

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "SET_LOCATION": {
      const { payload } = action;
      return { ...state, userLocation: payload };
    }
    case "CLEAN_LOCATION": {
      const { userLocation } = initialState;
      return { ...state, userLocation };
    }
    case "SET_TOKEN": {
      const { payload } = action;
      return { ...state, token: payload };
    }
    case "CLEAN_TOKEN": {
      const { token } = initialState;
      return { ...state, token };
    }
    case "SET_PLACE": {
      const { payload } = action;
      let { selectedPlace } = state;

      selectedPlace = { ...selectedPlace, ...payload };

      return { ...state, selectedPlace };
    }
    case "CLEAN_PLACE": {
      const { selectedPlace } = initialState;
      return { ...state, selectedPlace };
    }
    default: return state;
  }
};
