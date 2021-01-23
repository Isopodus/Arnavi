import React from 'react';
import { View, Animated, Easing, TouchableOpacity, Text, FlatList } from 'react-native';
import getTheme from "../global/Style";
import {Icon, Input} from "./index";
import { searchPlace } from '../utils/Geolocation';
import { useSelector, useDispatch } from 'react-redux';
import { setAction } from "../store";

const convertDistance = (m) => {
    const km = m / 1000;
    if (km < 0.5) return `${m} m`;
    else return `${Math.round(km)} km`;
};

const Separator = () => {
    const theme = getTheme();
    return(
        <View style={{ width: '100%', height: theme.scale(20)}} />
    )
};

export default function Header() {
    const theme = getTheme();
    const styles = getStyles(getTheme());
    const {token, userLocation} = useSelector(state => state);
    const dispatch = useDispatch();

    const [text, setText] = React.useState('');
    const [searching, setSearching] = React.useState(false);
    const [placesList, setPlacesList] = React.useState([]);

    let inputRef = React.useRef(null);
    const fadeBackground = React.useRef(new Animated.Value(0)).current;

    const onEndSearching = React.useCallback(() => {
        Animated.timing(fadeBackground, {
            toValue: 0,
            easing: Easing.linear(),
            duration: 300
        }).start(() => setSearching(false));
    }, [fadeBackground, inputRef]);
    const onSelect = React.useCallback((place) => {
        setPlacesList([]);
        onEndSearching();
        dispatch(setAction('place', { placeId: place.place_id }));
    }, []);

    React.useEffect(() => {
        if (searching) {
            Animated.timing(fadeBackground, {
                toValue: 1,
                easing: Easing.linear(),
                duration: 300
            }).start();
        }
    }, [searching, fadeBackground]);
    React.useEffect(() => {
        if (text !== '') {
            searchPlace(text, token, userLocation)
                .then(res => {
                    if (res.status === 200) {
                        const { data } = res;
                        setPlacesList(data.predictions);
                    }
                });
        }
    }, [text, token, userLocation]);

    return(
        <React.Fragment>
            <View style={styles.searchBox}>
                <View style={{ flex: 0.15 }}>
                    {searching
                        ? (
                            <TouchableOpacity onPress={onEndSearching}>
                                <Icon
                                    name={'arrow-back'}
                                    color={theme.textAccent}
                                    size={theme.scale(22)}
                                />
                            </TouchableOpacity>
                        )
                        : (
                            <Icon
                                name={'search'}
                                color={theme.textAccent}
                                size={theme.scale(22)}
                            />
                        )
                    }
                </View>
                <Input
                    onSetRef={(ref) => { inputRef = ref }}
                    value={text}
                    setValue={setText}
                    placeholder={'Search for locations...'}
                    placeholderColor={theme.textAccent}
                    style={styles.searchText}
                    onFocus={() => setSearching(true)}
                    onBlur={onEndSearching}
                />
                <Icon
                    name={'star-border'}
                    color={theme.textAccent}
                    size={theme.scale(22)}
                    style={{ flex: 0.1 }}
                />
            </View>
            {searching && (
                <React.Fragment>
                    <Animated.View style={[styles.searchList, { opacity: fadeBackground }]}>
                        {placesList.length !== 0 && placesList.map((place, idx) => {
                            return(
                                <TouchableOpacity style={theme.rowAlignedBetween} onPress={() => onSelect(place)} key={idx}>
                                    <Icon
                                        name={'arrow-up-left'}
                                        color={theme.textAccent}
                                        size={theme.scale(22)}
                                        style={{ flex: 0.1 }}
                                    />
                                    <Text style={styles.placeText} numberOfLines={2} ellipsizeMode='tail'>
                                        {place.description}
                                    </Text>
                                    <Text style={styles.distanceText}>
                                        {convertDistance(place.distance_meters)}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>
                    <Animated.View style={[styles.searchBackground, { opacity: fadeBackground }]} />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

function getStyles(theme) {
    return {
        searchBox: {
            ...theme.rowAlignedBetween,
            flex: 1,
            paddingVertical: theme.scale(10),
            paddingHorizontal: theme.scale(20),
            position: 'absolute',
            top: 0,
            zIndex: 2,
            width: '100%',
            height: theme.scale(60)
        },
        searchList: {
            flex: 1,
            top: theme.scale(60),
            zIndex: 2,
            width: '100%',
            position: 'absolute',
            paddingHorizontal: theme.scale(20),
            paddingVertical: theme.scale(10),
        },
        searchText: [
            theme.textStyle({
                font: 'NunitoRegular',
                color: 'textAccent',
                size: 16,
                align: 'left'
            }),
            {
                flex: 0.9,
            }
        ],
        searchBackground: [
            {
                backgroundColor: theme.white,
                position: 'absolute',
                top: 0,
                zIndex: 1,
                flex: 1,
            },
            theme.fullScreen
        ],
        placeText: [
            theme.textStyle({
                font: 'NunitoRegular',
                color: 'textPlaceholder',
                size: 14,
                align: 'left'
            }),
            {
                flex: 0.8,
            }
        ],
        distanceText: [
            theme.textStyle({
                font: 'NunitoRegular',
                color: 'textSecondary',
                size: 12,
                align: 'right'
            }),
            {
                flex: 0.2,
            }
        ]
    };
}
