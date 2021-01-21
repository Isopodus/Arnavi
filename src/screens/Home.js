import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { Map } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View>
            <Map/>
            <Button
                style={styles.button}
                title='Go to AR'
                onPress={() => navigation.navigate('AR')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

});
