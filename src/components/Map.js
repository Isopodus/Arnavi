import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {
    return(
        <MapView
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={{height: 800, margin: 40}}
        />
    )
}
