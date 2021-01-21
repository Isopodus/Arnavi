import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {
    return(
        <MapView
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            style={{height: 500, margin: 40}}
        />
    )
}
