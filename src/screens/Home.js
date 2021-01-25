// TODO спинер загрузки при получении изначальных координат пользователя

import React from 'react';
import {SearchBox, Icon, MapContainer, Popup, Button} from "../components";
import {View, TouchableOpacity, Text, ImageBackground, Animated, Easing} from "react-native";
import getTheme from "../global/Style";
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import { getPlaceDetail } from '../utils/Geolocation';
import { getDistance, convertDistance } from '../utils/Distance';
import { setAction, cleanAction } from "../store";
import { GOOGLE_API_KEY } from "../global/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";

const getImageUrl = (image) => {
    const { photo_reference, height, width } = image;
    return `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_API_KEY}&photoreference=${photo_reference}&maxheight=${height}&maxwidth=${width}`;
};

let movedToCurrent = false;
export default function Home() {
    const theme = getTheme();
    const styles = getStyles(theme);
    const {token, userLocation, selectedPlace} = useSelector(state => state);

    const dispatch = useDispatch();
    const navigator = useNavigation();

    const [followUserMode, setFollowUserMode] = React.useState(true);
    const [mapRef, setMapRef] = React.useState(null);
    const [pins, setPins] = React.useState([]);
    const [modal, setModal] = React.useState(false);

    const movingAnimation = React.useRef(new Animated.Value(60)).current;

    const onMoveToCurrentLocation = React.useCallback((flag = true) => {
        console.log(followUserMode, flag, userLocation)
        const { lat, lng } = userLocation;
        if (lat && lng) {
            flag && setFollowUserMode(true);
            mapRef && mapRef.animateToRegion({
                longitude: lng,
                latitude: lat,
                latitudeDelta: 0.01250270688370961,
                longitudeDelta: 0.01358723958820065,
            }, 1200);
        }
    }, [userLocation, mapRef]);
    const onMoveToLocation = React.useCallback((coords) => {
        mapRef && mapRef.animateToRegion({
            longitude: coords.lng,
            latitude: coords.lat,
            latitudeDelta: 0.01250270688370961,
            longitudeDelta: 0.01358723958820065,
        }, 1200);
    }, [mapRef]);
    const onPinClick = React.useCallback(() => setModal(true), []);
    const onGetDistance = React.useCallback((coords) => {
        return convertDistance(getDistance(userLocation, coords));
    }, [userLocation]);
    const onUnlocked = React.useCallback(() => {
        setFollowUserMode(true);
        setModal(false);
        setPins([]);
        dispatch(cleanAction('place'));
    }, []);
    const onSelectFavoriteLocation = React.useCallback(() => {
        AsyncStorage.getItem('@favorites')
            .then(favorites => {
                const data = favorites ? JSON.parse(favorites) : [];
                if (selectedPlace.isFavorite) {
                    AsyncStorage.setItem(
                        '@favorites',
                        JSON.stringify(data.filter(item => item.placeId !== selectedPlace.placeId))
                    ).then(() => {
                        dispatch(setAction('place', { isFavorite: !selectedPlace.isFavorite }));
                    });
                }
                else {
                    AsyncStorage.setItem(
                        '@favorites',
                        JSON.stringify(
                            [
                                ...data,
                                { placeId: selectedPlace.placeId, address: selectedPlace.address }
                            ]
                        )
                    ).then(() => {
                        dispatch(setAction('place', { isFavorite: !selectedPlace.isFavorite }));
                    });
                }
            });
    }, [selectedPlace]);

    React.useEffect(() => {
        if (followUserMode) onMoveToCurrentLocation();
    }, [followUserMode]);
    React.useEffect(() => {
        if (!movedToCurrent && userLocation.lat !== null && userLocation.lng !== null) {
            onMoveToCurrentLocation();
            movedToCurrent = true;
        }
    }, [userLocation]);
    React.useEffect(() => {
        if (selectedPlace.placeId) {
            setFollowUserMode(false);
            setModal(true);
            getPlaceDetail(selectedPlace.placeId, token)
                .then(res => {
                    if (res.status === 200) {
                        const { geometry, formatted_address, photos, name } = res.data.result;
                        setPins(prev => [{ location: geometry.location, color: theme.textAccent }]);
                        AsyncStorage.getItem('@favorites')
                            .then((favorites) => {
                                let isFavorite = false;

                                if (favorites) {
                                    JSON.parse(favorites).forEach((favorite) => {
                                       if (favorite.placeId === selectedPlace.placeId) isFavorite = true;
                                    });
                                }

                                dispatch(
                                    setAction(
                                        'place',
                                        {
                                            name,
                                            location: geometry.location,
                                            address: formatted_address,
                                            photo: photos.length !== 0 ? photos[0] : null,
                                            distance: onGetDistance(geometry.location),
                                            isFavorite,
                                            isFullData: true
                                        }
                                    )
                                );
                                onMoveToLocation({ lat: geometry.location.lat, lng: geometry.location.lng });
                            })
                    }
                });
        }
    }, [selectedPlace.placeId, token]);
    React.useEffect(() => {
        if (modal) {
            Animated.timing(movingAnimation, {
                toValue: 310,
                easing: Easing.linear(),
                duration: 300
            }).start();
        }
        else {
            Animated.timing(movingAnimation, {
                toValue: 60,
                easing: Easing.linear(),
                duration: 300
            }).start();
        }
    }, [modal]);

    return(
        <React.Fragment>
            <MapContainer onSetRef={(ref) => setMapRef(ref)} pins={pins} onPinClick={onPinClick} />
            <LinearGradient
                colors={[theme.rgba(theme.black, 1), theme.rgba(theme.black, 0)]}
                style={styles.gradient}
            />
            <SearchBox locked={!followUserMode} onClearLocation={onUnlocked} />
            <Animated.View style={[styles.btnBar, { bottom: movingAnimation }]}>
                {selectedPlace.isFullData && (
                    <React.Fragment>
                        <TouchableOpacity onPress={onUnlocked}>
                            <Icon
                                name={'close'}
                                color={theme.textAccent}
                                size={theme.scale(25)}
                                style={styles.roundBtn}
                            />
                        </TouchableOpacity>
                        <View style={{ height: theme.scale(15) }} />
                    </React.Fragment>
                )}
                {(selectedPlace.isFullData) && (
                    <React.Fragment>
                        <TouchableOpacity onPress={() => onMoveToLocation(selectedPlace.location)}>
                            <Icon
                                name={'map-marker-alt'}
                                color={theme.textAccent}
                                size={theme.scale(22)}
                                style={styles.roundBtn}
                            />
                        </TouchableOpacity>
                        <View style={{ height: theme.scale(15) }} />
                    </React.Fragment>
                )}
                <TouchableOpacity onPress={() => onMoveToCurrentLocation(false)}>
                    <Icon
                        name={'my-location'}
                        color={theme.textAccent}
                        size={theme.scale(25)}
                        style={styles.roundBtn}
                    />
                </TouchableOpacity>
            </Animated.View>
            <Popup visible={modal} style={styles.modal} onClose={() => setModal(false)}>
                {selectedPlace.isFullData && (
                    <View style={theme.rowAlignedCenterVertical}>
                        <View style={styles.row}>
                            <View style={styles.bar} />
                        </View>
                        <View style={theme.rowAlignedBetweenStretch}>
                            <ImageBackground
                                source={{uri: getImageUrl(selectedPlace.photo)}}
                                style={styles.image}
                                resizeMode={'cover'}
                            />
                            <View style={styles.textBox}>
                                <View style={theme.rowAlignedBetweenStretch}>
                                    <Text style={styles.primaryText} numberOfLines={1}>
                                        {selectedPlace.name}
                                    </Text>
                                    <TouchableOpacity
                                        style={{ paddingLeft: theme.scale(20) }}
                                        onPress={onSelectFavoriteLocation}
                                    >
                                        <Icon
                                            name={selectedPlace.isFavorite ? 'star' : 'star-border'}
                                            color={theme.textAccent}
                                            size={theme.scale(20)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.secondaryText} numberOfLines={2}>
                                    {selectedPlace.address}
                                </Text>
                                <Text style={styles.detailsText}>
                                    {selectedPlace.distance} away
                                </Text>
                            </View>
                        </View>
                        <Button
                            text={'Create route'}
                            onPress={() => navigator.navigate('AR')}
                            containerStyle={{ flex: 1, width: '100%', marginTop: theme.scale(22) }}
                        />
                    </View>
                )}
            </Popup>
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
        },
        btnBar: {
            ...theme.rowAlignedRightVertical,
            position: 'absolute',
            width: '100%',
            flex: 1,
            paddingHorizontal: theme.scale(25),
        },
        roundBtn: {
            ...theme.rowAlignedCenterVertical,
            height: theme.scale(45),
            width: theme.scale(45),
            padding: theme.scale(10),
            backgroundColor: theme.rgba(theme.black, 0.8),
            borderRadius: 150/2,
        },
        modal: {
            height: theme.scale(230),
            backgroundColor: theme.rgba(theme.black, 0.8),
            borderTopLeftRadius: theme.scale(20),
            borderTopRightRadius: theme.scale(20),
            paddingTop: theme.scale(20),
            paddingHorizontal: theme.scale(20),
        },
        image: {
            height: theme.scale(110),
            width: theme.scale(100),
            flex: 0.3,
        },
        textBox: {
            ...theme.rowAlignedBetweenVertical,
            flex: 0.7,
            paddingLeft: theme.scale(20)
        },
        primaryText: theme.textStyle({
            font: 'NunitoBold',
            color: 'textAccent',
            size: 16,
            align: 'left'
        }),
        secondaryText: theme.textStyle({
            font: 'NunitoRegular',
            color: 'textPlaceholder',
            size: 12,
            align: 'left'
        }),
        detailsText: theme.textStyle({
            font: 'NunitoRegular',
            color: 'textSecondary',
            size: 12,
            align: 'left'
        }),
        bar: {
            width: theme.scale(50),
            height: theme.scale(4),
            backgroundColor: theme.textSecondary,
            borderRadius: theme.scale(10),
            marginBottom: theme.scale(15)
        }
    }
}
