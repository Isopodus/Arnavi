import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const {DeviceEventEmitter} = require('react-native');
const ReactNativeHeading = require('react-native-heading');

import {
    ViroARScene,
    ViroMaterials,
} from 'react-viro';

import {rotatePoint, calcCrow, bearing} from '../utils/Coordinates';
import ARWaypointMarker from "../components/ARWaypointMarker";
import { connect } from 'react-redux';

class ARNavigator extends Component {

    constructor() {
        super();

        this.updateInitialHeading = true;
        this.state = {
            heading: 0,
            initialHeading: 0,
        };
    }

    componentDidMount() {
        ReactNativeHeading.start(1)
            .then(didStart => {
                console.log(didStart);
                this.setState({
                    headingIsSupported: didStart,
                })
            })

        DeviceEventEmitter.addListener('headingUpdated', data => {
            const {initialHeading} = this.state;
            data = (data + 360) % 360;
            this.setState({
                heading: data,
                initialHeading: this.updateInitialHeading ? data : initialHeading
            });
            if (this.updateInitialHeading) this.updateInitialHeading = false;
        });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.userLocation !== this.props.userLocation)
        {
            this.updateInitialHeading = true;
        }
    }

    componentWillUnmount() {
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    }

    render() {
        const {heading, initialHeading} = this.state;

        const lat2 = 47.90889185800383, lon2 = 33.34779564378661;
        const {lat, lng} = this.props.userLocation;

        const distance = calcCrow(lat, lng, lat2, lon2);
        const angle = bearing(lat, lng, lat2, lon2);

        const point = [0, 0, distance];
        let newPoint = null;
        if (initialHeading !== null) {
            newPoint = rotatePoint(point, initialHeading + angle);
        }

        return (
            <ViroARScene>
                {newPoint && <ARWaypointMarker point={newPoint}/>}
            </ViroARScene>
        );
    }
}

const mapStateToProps = state => ({
    userLocation: state.userLocation
});

export default connect(mapStateToProps, null)(ARNavigator);

ViroMaterials.createMaterials({
    arrow: {
        diffuseTexture: require('../assets/arrow.jpg')
    }
});
