import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import getTheme from "../global/Style";

export default function Button(props) {
    const theme = getTheme();
    const styles = getStyles(theme);
    const { text, onPress, containerStyle } = props;

    return(
        <TouchableOpacity onPress={onPress} style={[containerStyle, styles.button]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

function getStyles(theme) {
    return {
        button: {
            ...theme.rowAlignedCenterVertical,
            borderRadius: theme.scale(10),
            backgroundColor: theme.textAccent,
            paddingVertical: theme.scale(20),
        },
        text: theme.textStyle({
            font: 'NunitoMedium',
            color: 'black',
            size: 14,
            align: 'left'
        }),
    }
}
