import React from 'react';
import {StatusBar, PermissionsAndroid} from 'react-native';

import {Provider, useDispatch} from 'react-redux';
import {store, setAction} from "./src/store";

import UUIDGenerator from 'react-native-uuid-generator';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import Navigator from "./src/Navigator";

function AppRoot() {
    const dispatch = useDispatch();

    const configureLocation = async () => {
        // Request permission
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Arnavi geolocation permission",
                message:
                    "Arnavi needs to know your accurate location to perform the best. Please allow!",
                buttonNegative: "Cancel",
                buttonPositive: "Allow"
            })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            // Ask to turn on GPS
            const response = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                interval: 10000,
                fastInterval: 5000,
            })
            if (response === 'enabled' || response === 'already-enabled') {

                // Set location watch
                setTimeout(() => {
                    this.locationWatch = Geolocation.watchPosition(info => {
                            const {longitude, latitude} = info.coords;
                            dispatch(setAction('location', {lat: latitude, lng: longitude}));
                        }, error => console.log(error),
                        {
                            distanceFilter: 0,
                            timeout: 5000,
                            maximumAge: 10000,
                            enableHighAccuracy: true
                        });
                }, 1000);
            }
        }
    }

    // Hide status bar
    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    // Set geolocation callbacks
    React.useEffect(() => {
        configureLocation();
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

    return (
        <React.Fragment>
            <Navigator/>
        </React.Fragment>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <AppRoot/>
        </Provider>
    );
}
