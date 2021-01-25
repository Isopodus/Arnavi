import React from 'react';
import {Header, Icon, MapContainer} from "./index";
import {View, TouchableOpacity, Text } from "react-native";
import getTheme from "../global/Style";
import { useSelector } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import { getPlaceDetail } from '../utils/Geolocation';

export default function Map() {
    const theme = getTheme();
    const styles = getStyles(theme);
    const {token, userLocation, selectedPlace} = useSelector(state => state);
    const [mapRef, setMapRef] = React.useState(null);

    const onMoveToCurrentLocation = React.useCallback(() => {
        //console.log('onMoveToCurrentLocation', userLocation)
        const { lat, lng } = userLocation;
        if (lat && lng) {
            mapRef && mapRef.animateToRegion({
                longitude: lng,
                latitude: lat,
                latitudeDelta: 0.01250270688370961,
                longitudeDelta: 0.01358723958820065,
            }, 1200);
        }
    }, [userLocation, mapRef]);
    const onMoveToLocation = React.useCallback((coords) => {
        //console.log('onMoveToLocation', coords)
        mapRef && mapRef.animateToRegion({
            longitude: coords.lng,
            latitude: coords.lat,
            latitudeDelta: 0.01250270688370961,
            longitudeDelta: 0.01358723958820065,
        }, 1200);
    }, [mapRef]);

    React.useEffect(() => {
        onMoveToCurrentLocation();
    }, [userLocation]);

    React.useEffect(() => {
        if (selectedPlace.placeId) {
            getPlaceDetail(selectedPlace.placeId, token)
                .then(res => {
                    if (res.status === 200) {
                        const { geometry } = res.data.result;
                        onMoveToLocation(
                            { lat: geometry.location.lat, lng: geometry.location.lng }
                        );
                    }
                });
        }
    }, [selectedPlace, token]);

    return(
        <React.Fragment>
            <MapContainer onSetRef={(ref) => setMapRef(ref)} />
            <LinearGradient
                colors={['rgba(13, 13, 13, 1)', 'rgba(13, 13, 13, 0)']}
                style={styles.gradient}
            />
            <Header />
            <View style={{position: 'absolute', top: theme.scale(500), width: '100%'}}>
                <TouchableOpacity onPress={onMoveToCurrentLocation}>
                    <Icon
                        name={'my-location'}
                        color={theme.textAccent}
                        size={theme.scale(25)}
                    />
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}

function getStyles(theme) {
    return {
        gradient: {
            flex: 1,
            width: '100%',
            height: theme.scale(300),
            position: 'absolute',
            top: 0,
        }
    }
}
