import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from "./src/Navigator";
import { Provider, useDispatch } from 'react-redux';
import RNLocation from "react-native-location";
import { store, setAction } from "./src/store";

function AppRoot() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);
    React.useEffect(() => {
        let locationSubscription;

        RNLocation.configure({
            distanceFilter: 0.1
        });

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
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
                        const { latitude, longitude } = locations[0];
                        dispatch(setAction('location', { lat: latitude, lng: longitude }));
                        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA', state)
                    }
                );
        }});

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
