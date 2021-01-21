import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import style from '../assets/map/style';
import getTheme from '../global/Style';

export default function Map(props) {
    const { fullscreen = true } = props;
    const theme = getTheme();
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
            style={fullscreen && { height: '100%' }}
            customMapStyle={style}
        />
    )
}
