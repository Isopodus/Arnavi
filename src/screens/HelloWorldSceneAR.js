import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

    constructor() {
        super();

        this.state = {
            text: "Initializing AR..."
        };
    }

    render() {
        return (
            <ViroARScene onTrackingUpdated={this.onInitialized}>
                <ViroText text={this.state.text}
                          scale={[0.1, 0.1, 0.1]}
                          position={[0, 0, -1]}
                          //rotation={[35, 30, 0]}
                          style={styles.helloWorldTextStyle}/>
            </ViroARScene>
        );
    }

    onInitialized = (state, reason) => {
        if (state === ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: "Hello World!"
            });
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
