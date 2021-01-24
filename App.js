import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from "./src/Navigator";
import { Provider, useDispatch } from 'react-redux';
import { store, setAction } from "./src/store";
import UUIDGenerator from 'react-native-uuid-generator';
import Geolocation from '@react-native-community/geolocation';

function AppRoot() {
    const dispatch = useDispatch();

    // Hide status bar
    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    // Set geolocation callbacks
    React.useEffect(() => {
        this.locationWatch = Geolocation.watchPosition(info => {
            const {longitude, latitude} = info.coords;
            dispatch(setAction('location', {lat: latitude, lng: longitude}));
        }, error => console.log(error),
            {
                timeout: 5000,
                maximumAge: 10000,
                enableHighAccuracy: true
            });
    }, []);

    // Clear location on unmount
    React.useEffect(() => {
        return () => {
            if (this.locationWatch) {
                Geolocation.clearWatch(this.locationWatch);
            }
        };
    }, []);

    // Generate session token
    React.useEffect(() => {
        UUIDGenerator.getRandomUUID((uuid) => {
            dispatch(setAction('token', uuid));
        });
    }, []);

    return(
        <React.Fragment>
            <Navigator/>
        </React.Fragment>
    )
}

export default function App() {
    return(
        <Provider store={store}>
            <AppRoot />
        </Provider>
    );
}
