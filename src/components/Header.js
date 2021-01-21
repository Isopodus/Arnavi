import React from 'react';
import { View, Animated, Easing } from 'react-native';
import getTheme from "../global/Style";
import {Icon, Input} from "./index";

export default function Header() {
    const theme = getTheme();
    const styles = getStyles(getTheme());

    const [place, setPlace] = React.useState('');
    const [searching, setSearching] = React.useState(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const onEndSearching = React.useCallback(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            easing: Easing.linear(),
            duration: 300
        }).start(() => setSearching(false));
    }, [fadeAnim]);

    React.useEffect(() => {
        if (searching) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                easing: Easing.linear(),
                duration: 300
            }).start();
        }
    }, [searching, fadeAnim]);

    return(
        <React.Fragment>
            <View style={styles.container}>
                <Icon
                    name={'search'}
                    color={theme.textAccent}
                    size={theme.scale(22)}
                    style={{ flex: 0.15 }}
                />
                <Input
                    value={place}
                    setValue={setPlace}
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
            {searching && <Animated.View style={[styles.searchBackground, { opacity: fadeAnim }]} />}
        </React.Fragment>
    )
}

function getStyles(theme) {
    return {
        container: {
            ...theme.rowAlignedBetween,
            flex: 1,
            paddingVertical: theme.scale(10),
            paddingHorizontal: theme.scale(20),
            position: 'absolute',
            top: 0,
            zIndex: 2,
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
                backgroundColor: theme.black,
                position: 'absolute',
                top: 0,
                zIndex: 1,
                flex: 1,
            },
            theme.fullScreen
        ]
    };
}
