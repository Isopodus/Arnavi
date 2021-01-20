import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { Map } from '../components';

export default function Home() {
    return (
        <View>
            <Map />
            <Button
                style={styles.button}
                title='Go to AR'
                onPress={() => navigation.navigate('AR')}
            />
        </View>
    )
}

let styles = StyleSheet.create({
    button: {

    },
});
