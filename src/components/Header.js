import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native';
import getTheme from "../global/Style";

export default function Header(props) {
    const { containerStyle } = props;
    const styles = getStyles(getTheme());
    return(
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0)']} style={[styles.container, containerStyle]}>
            <Text>FUCK</Text>
        </LinearGradient>
    )
}

function getStyles(theme) {
    return {
        container: {
            ...theme.rowAlignedBetween,
            flex: 1,
            height: theme.scale(150)
        },
    };
}
