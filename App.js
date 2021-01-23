import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from "./src/Navigator";
import { Provider, useDispatch, useSelector } from 'react-redux';
import RNLocation from "react-native-location";
import { store, setAction } from "./src/store";

function AppRoot() {
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location)

    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);

    React.useEffect(() => {
        console.log('LOCATION', location)
    }, [location]);

    React.useEffect(() => {
        let locationSubscription;

        RNLocation.configure({
            distanceFilter: 1,
            desiredAccuracy: {
                ios: "best",
                android: "highAccuracy"
            },
            interval: 5000,
        });

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
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
    return(
        <>
            <Navigator/>
        </>
    )
}

export default function App() {
    return(
        <Provider store={store}>
            <AppRoot />
        </Provider>
    );
}
