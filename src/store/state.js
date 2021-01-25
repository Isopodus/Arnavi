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
    photo: null,
    distance: null,
    isFavorite: false,
    isFullData: false
  },
  recentLocations: []
};

export default initialState;
