import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from "./src/Navigator";
import { Provider, useDispatch } from 'react-redux';
import RNLocation from "react-native-location";
import { store, setAction, cleanAction } from "./src/store";
import UUIDGenerator from 'react-native-uuid-generator';

function AppRoot() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    React.useEffect(() => {
        let locationSubscription;

        RNLocation.configure({
            interval: 5000,
        });

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse",
                rationale: {
                    title: "Location permission",
                    message: "We use your location to demo the library",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        }).then(granted => {
            if (granted) {
                locationSubscription = RNLocation.subscribeToLocationUpdates(
                    locations => {
                        const {latitude, longitude} = locations[0];
                        dispatch(setAction('location', {lat: latitude, lng: longitude}));
                    }
                );
            }
        });

        return locationSubscription && locationSubscription();
    }, []);

    React.useEffect(() => {
        UUIDGenerator.getRandomUUID((uuid) => {
            dispatch(setAction('token', uuid));
        });

        return dispatch(cleanAction('token'));
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
