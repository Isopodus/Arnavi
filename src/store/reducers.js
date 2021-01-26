import initialState from './state';

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "SET_APP_READY": {
      return { ...state, appReady: true };
    }
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
    case "SET_RECENT_LOCATIONS": {
      const { payload } = action;
      let { recentLocations } = state;

      recentLocations =
          recentLocations.length === 6
              ? [...recentLocations.slice(1), payload]
              : [...recentLocations, payload];

      return { ...state, recentLocations };
    }
    case "SET_DIRECTIONS": {
      const { payload } = action;
      return { ...state, directions: payload };
    }
    case "CLEAN_DIRECTIONS": {
      const { directions } = initialState;
      return { ...state, directions };
    }
    default: return state;
  }
};
