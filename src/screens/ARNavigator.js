import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const {DeviceEventEmitter} = require('react-native');
const ReactNativeHeading = require('react-native-heading');

import {
    ViroARScene,
    ViroBox,
    ViroMaterials,
} from 'react-viro';

import {rotatePoint} from '../utils/Coordinates';

export default class ARNavigator extends Component {

    constructor() {
        super();

        this.state = {
            heading: 0,
            initialHeading: null,
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
            const {initialHeading} = this.state;
            data = (data + 360) % 360;
            this.setState({
                heading: data,
                initialHeading: initialHeading === null ? data : initialHeading
            });
        });

    }

    componentWillUnmount() {
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    }

    render() {
        const {heading, initialHeading} = this.state;
        console.log(heading, initialHeading);

        const point = [0, 0, -0.7]; // 70cm in front

        let newPoint = null;
        if (initialHeading !== null) {
            newPoint = rotatePoint(point, initialHeading-180);
        }

        return (
            <ViroARScene>
                {newPoint && <ViroBox
                    height={0.1}
                    length={0.1}
                    width={0.1}
                    scale={[0.3, 0.3, 0.3]}
                    materials={["arrow"]}
                    position={newPoint}
                    rotation={[0, 0, 0]}/>
                }
            </ViroARScene>
        );
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

ViroMaterials.createMaterials({
    arrow: {
        diffuseTexture: require('../assets/arrow.jpg')
    }
});
