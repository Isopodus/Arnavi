import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import style from '../assets/map/style';
import getTheme from '../global/Style';

export default function MapContainer(props) {
    const { fullscreen = true, onSetRef } = props;
    const theme = getTheme();
    return(
        <MapView
            ref={(map) => onSetRef(map)}
            showsUserLocation={true}
            showsMyLocationButton={false}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            style={fullscreen && { height: '100%' }}
            customMapStyle={style}
        />
    )
}
