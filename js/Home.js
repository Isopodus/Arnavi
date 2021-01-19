import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default  class Home extends Component {
    render() {
        return <View>
            <Button
                style={styles.button}
                title="Go to AR"
                onPress={this.props.onAr}
            />
        </View>
    }
}

let styles = StyleSheet.create({
    button: {

    },
});