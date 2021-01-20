import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default  class Home extends Component {
    render() {
        const {navigation} = this.props;

        return <View>
            <Button
                style={styles.button}
                title='Go to AR'
                onPress={() => navigation.navigate('AR')}
            />
        </View>
    }
}

let styles = StyleSheet.create({
    button: {

    },
});