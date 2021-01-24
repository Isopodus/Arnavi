const initialState = {
  userLocation: {
    lat: null,
    lng: null
  },
  token: null,
  selectedPlace: {
    name: null,
    placeId: null,
    address: null,
    location: {
      lat: null,
      lng: null
    },
    rating: null,
    opening_hours: null,
    photo: null,
    distance: null,
    isFullData: false
  },
  recentLocations: []
};

export default initialState;
