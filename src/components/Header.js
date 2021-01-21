import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import getTheme from "../global/Style";
import {Icon, Input} from "./index";

export default function Header(props) {
    const theme = getTheme();
    const { containerStyle } = props;
    const styles = getStyles(getTheme());
    const [place, setPlace] = React.useState('');
    return(
        <LinearGradient
            colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}
            style={[styles.container, containerStyle]}
        >
            <View style={theme.rowAlignedBetween}>
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
                />
                <Icon
                    name={'star-border'}
                    color={theme.textAccent}
                    size={theme.scale(22)}
                    style={{ flex: 0.1 }}
                />
            </View>
        </LinearGradient>
    )
}

function getStyles(theme) {
    return {
        container: {
            ...theme.rowAlignedTop,
            flex: 1,
            paddingVertical: theme.scale(10),
            paddingHorizontal: theme.scale(20)
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
        ]
    };
}
