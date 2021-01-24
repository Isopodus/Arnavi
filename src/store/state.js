const initialState = {
  userLocation: {
    lat: null,
    lng: null
  },
  token: null,
  selectedPlace: {
    placeId: null,
    address: null,
    location: {
      lat: null,
      lng: null
    }
  },
  recentLocations: []
};

export default initialState;
