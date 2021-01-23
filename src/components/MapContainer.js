import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import style from '../assets/map/style';

export default function MapContainer(props) {
    const { fullscreen = true, onSetRef, pins } = props;

    const markers = React.useMemo(() => {
        return pins.map((pin, idx) => {
            const { color, location } = pin;
            return(
                <Marker
                    pinColor={color}
                    coordinate={{ latitude: location.lat, longitude: location.lng }}
                    key={idx}
                />
            )
        });
    }, [pins]);

    return(
        <MapView
            ref={(map) => onSetRef(map)}
            showsUserLocation={true}
            showsMyLocationButton={false}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            style={fullscreen && { height: '95%' }}
            customMapStyle={style}
        >
            {markers}
        </MapView>
    )
}
