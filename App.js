import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from "./src/Navigator";
import { Provider, useDispatch } from 'react-redux';
import { store, setAction } from "./src/store";
import UUIDGenerator from 'react-native-uuid-generator';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AppRoot() {
    const dispatch = useDispatch();

    // Hide status bar
    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    // Set geolocation callbacks
    React.useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            const {longitude, latitude} = info.coords;
            dispatch(setAction('location', {lat: latitude, lng: longitude}));
        });
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
