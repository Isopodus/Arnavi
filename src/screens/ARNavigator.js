import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const { DeviceEventEmitter } = require('react-native');
const ReactNativeHeading = require('react-native-heading');

import {
    ViroARScene,
    ViroText,
    ViroConstants,
} from 'react-viro';

export default class ARNavigator extends Component {

    constructor() {
        super();

        this.state = {
            heading: 0,
        };
    }

    componentDidMount() {
        ReactNativeHeading.start(1)
            .then(didStart => {
                this.setState({
                    headingIsSupported: didStart,
                })
            })

        DeviceEventEmitter.addListener('headingUpdated', data => {
            this.setState({heading: data});
        });

    }
    componentWillUnmount() {
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    }


    render() {
        //console.log(this.state.heading)
        return (
            <ViroARScene onTrackingUpdated={this.onInitialized}>
                {/*<ViroText text={this.state.text}*/}
                {/*          scale={[0.1, 0.1, 0.1]}*/}
                {/*          position={[0, 0, -1]}*/}
                {/*          //rotation={[35, 30, 0]}*/}
                {/*          style={styles.helloWorldTextStyle}/>*/}
            </ViroARScene>
        );
    }

    onInitialized = (state, reason) => {
        if (state === ViroConstants.TRACKING_NORMAL) {

        } else if (state === ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }
}

let styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 40,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
