import React from 'react';
import { Button } from 'react-native';
import { Map } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const { navigate } = useNavigation();

    return (
        <React.Fragment>
            <Map />
            <Button
                title='Go to AR'
                onPress={() => navigate('AR')}
            />
        </React.Fragment>
    )
}
