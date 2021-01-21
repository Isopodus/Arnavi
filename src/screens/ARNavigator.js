import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const {DeviceEventEmitter} = require('react-native');
const ReactNativeHeading = require('react-native-heading');

import {
    ViroARScene,
    ViroBox,
    ViroMaterials,
} from 'react-viro';

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

    // Fix 90 degree offset
    fixAngle = (angle, fix) => {
        return angle <= fix ? fix - angle : 360 + fix - angle;
    }

    // Rotate a point in space by given angle
    rotatePoint = (point, angle) => {
        const x = point[0], y = point[1], z = point[2];
        const newCoords = [0, y, 0];

        newCoords[0] = x * Math.cos(angle * Math.PI / 180) - z * Math.sin(angle * Math.PI / 180);
        newCoords[2] = x * Math.sin(angle * Math.PI / 180) + z * Math.cos(angle * Math.PI / 180);

        return newCoords;
    }


    render() {
        const {heading, initialHeading} = this.state;

        const point = [0, 0, -0.7]; // 70cm in front

        let newPoint = null;
        if (initialHeading !== null) {
            newPoint = this.rotatePoint(point, this.fixAngle(initialHeading, 0));
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
