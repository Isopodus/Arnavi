import React from 'react';
import {StatusBar, PermissionsAndroid} from 'react-native';

import {Provider, useDispatch} from 'react-redux';
import {store, setAction} from "./src/store";

import UUIDGenerator from 'react-native-uuid-generator';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Navigator from "./src/Navigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

let locationWatch = null;

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
            });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            const setLocationWatch = () => {
                locationWatch = setInterval(() => {
                    Geolocation.getCurrentPosition((info) => {
                            const {longitude, latitude} = info.coords;
                            dispatch(setAction('location', {lat: latitude, lng: longitude}));
                            dispatch(setAction('app'));
                        }, askGPS,
                        {
                            timeout: 5000,
                            maximumAge: 10000,
                            enableHighAccuracy: true
                        });
                }, 1000);
            };

            // Ask to turn on GPS
            const askGPS = () => {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                    interval: 5000,
                    fastInterval: 1000,
                })
                    .then(response => {
                        if (response === 'enabled') {
                            // Set location watch after a timeout
                            setTimeout(setLocationWatch, 1000);
                        } else if (response === 'already-enabled') {
                            // Set location watch
                            setLocationWatch();
                        }
                    });
            }
            askGPS();
        }
    };

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
            if (locationWatch !== null) {
               clearInterval(locationWatch);
            }
        };
    }, []);

    // Generate session token
    React.useEffect(() => {
        UUIDGenerator.getRandomUUID((uuid) => {
            dispatch(setAction('token', uuid));
        });
    }, []);

    // Check history of traveling
    React.useEffect(() => {
        AsyncStorage.getItem('@history')
            .then(history => {
                if (history) {
                    JSON.parse(history).forEach(item => {
                        dispatch(setAction('history', item));
                    });
                }
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
