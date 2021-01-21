import React from 'react';
import {View, Button, Text} from 'react-native';
import { Map, Header, Icon } from '../components';
import { useNavigation } from '@react-navigation/native';
import getTheme from "../global/Style";

export default function Home() {
    const { navigate } = useNavigation();
    const theme = getTheme();
    const styles = getStyles(theme);

    return (
        <React.Fragment>
            <Map />
            {/*<Button*/}
            {/*    title='Go to AR'*/}
            {/*    onPress={() => navigate('AR')}*/}
            {/*/>*/}
        </React.Fragment>
    )
}

function getStyles(theme) {
    return {
    };
}
