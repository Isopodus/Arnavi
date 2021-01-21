import React from 'react';
import {Header, Icon, MapContainer} from "./index";
import {View, TouchableOpacity, Text } from "react-native";
import getTheme from "../global/Style";
import { useSelector } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";

export default function Map() {
    const theme = getTheme();
    const styles = getStyles(theme);
    const location = useSelector(state => state.location);

    let mapRef = React.useRef(null);
    const onMoveToCurrentLocation = React.useCallback(() => {
        const { lat, lng } = location;
        if (lat && lng) {
            mapRef && mapRef.animateToRegion({
                longitude: lng,
                latitude: lat,
                latitudeDelta: 0.01250270688370961,
                longitudeDelta: 0.01358723958820065,
            }, 1000);
        }
    }, [location, mapRef]);

    React.useEffect(() => {
        onMoveToCurrentLocation();
    }, [location, mapRef]);
    return(
        <React.Fragment>
            <MapContainer onSetRef={(ref) => { mapRef = ref }} />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}
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
