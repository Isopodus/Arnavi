import React, {Component} from 'react';
import {Button, View, Vibration, Text} from 'react-native';

const {DeviceEventEmitter} = require('react-native');
const ReactNativeHeading = require('react-native-heading');

import {
    ViroARSceneNavigator,
    ViroMaterials,
} from 'react-viro';
import {NavigatorScene} from "../components";
import { connect } from 'react-redux';

import {bearing, calcCrow, rotatePoint} from "../utils/Coordinates";
import ARWaypointMarker from "../components/ARWaypointMarker";

class ARNavigator extends Component {

    // waypoints = [
    //         {lat: 47.90895, lng: 33.348},
    //         {lat: 47.90885, lng: 33.34807},
    //         {lat: 47.90889, lng: 33.34817}
    //     ];

    // waypoints = [
    //     {lat: 47.90892, lng: 33.34779},
    //     {lat: 47.90878, lng: 33.34778},
    //     {lat: 47.90863, lng: 33.3476}
    // ];

    waypoints = [
        {lat: 47.908953076075925, lng: 33.34762378333839},
        {lat: 47.908922470775664, lng: 33.34786382274828},

        // {lat: 47.90883,  lng: 33.34791},

        // {lat: 47.908964730815455, lng: 33.34753564073854},
        // {lat: 47.90902244926177, lng: 33.34738568640717},
        // {lat: 47.90905616183877, lng: 33.34719369708739},
        // {lat: 47.90913076019437, lng: 33.34705458432435},
        // {lat: 47.90913076019437, lng: 33.34705458432435},
        // {lat: 47.908978038151425, lng: 33.346981778046796},
        // {lat: 47.908825030267444, lng: 33.34689465073554},
        // {lat: 47.908823214937684, lng: 33.34717944139605},
        // {lat: 47.90878785493047, lng: 33.3475078204621},

        // {lat: 47.89546, lng: 33.33501},
        // {lat: 47.89608, lng: 33.33476},
        // {lat: 47.8957, lng: 33.32971},
        // {lat: 47.89606, lng: 33.33095},
        // {lat: 47.89482, lng: 33.3313},
        // {lat: 47.89607, lng: 33.33287},
    ];

    constructor() {
        super();

        this.heading = 0;
        this.state = {
            waypointIdx: 0,
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
            data = (data + 360) % 360;
            this.heading = data;
            if (this.state.initialHeading === null) {
                this.setState({initialHeading: data});
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userLocation !== this.props.userLocation)
        {
            this.checkIfNextWaypoint(this.waypoints[this.state.waypointIdx]);
        }
    }

    componentWillUnmount() {
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    }

    drawWaypoint = (waypointLocation, key) => {
        const {userLocation} = this.props;
        const {initialHeading} = this.state;

        if (waypointLocation && initialHeading !== null) {
            const distance = calcCrow(
                userLocation.lat, userLocation.lng,
                waypointLocation.lat, waypointLocation.lng
            );
            const angle = bearing(
                userLocation.lat, userLocation.lng,
                waypointLocation.lat, waypointLocation.lng
            );
            let point = [0, -5, -distance];
            point = rotatePoint(point, angle - initialHeading);

            console.log(distance, angle, initialHeading, point);

            return <ARWaypointMarker point={point} key={key}/>;
        }
        return null;
    }


    onNextWaypoint = () => {
        console.log('new waypoint idx:', this.state.waypointIdx+1)

        this.setState({
            waypointIdx: this.state.waypointIdx+1,
            initialHeading: this.heading
        });
        Vibration.vibrate([0, 150, 20, 150]);
    }

    checkIfNextWaypoint = (waypointLocation) => {
        if (waypointLocation) {
            const {userLocation} = this.props;
            const distance = calcCrow(
                userLocation.lat, userLocation.lng,
                waypointLocation.lat, waypointLocation.lng
            );
            if (distance > 5) {
                this.onNextWaypoint();
            }
        }
    }

    render() {
        const {userLocation} = this.props;
        const {waypointIdx} = this.state;

        let distance = 0;
        if (this.waypoints[waypointIdx])
            distance = calcCrow(
                userLocation.lat, userLocation.lng,
                this.waypoints[waypointIdx].lat, this.waypoints[waypointIdx].lng
        );
        return (
            <View style={{flex: 1}}>
                <ViroARSceneNavigator
                    viroAppProps={{
                        waypoint: this.drawWaypoint(this.waypoints[waypointIdx], waypointIdx)
                    }}
                    initialScene={{
                        scene: NavigatorScene,
                    }}
                />
                <Button
                    title='Next waypoint'
                    onPress={this.onNextWaypoint}
                    style={style.buttonNext}
                />
                <Text style={style.text}>{`${userLocation.lat}, ${userLocation.lng}, ${distance}`}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userLocation: state.userLocation
});

export default connect(mapStateToProps, null)(ARNavigator);

const style ={
    buttonNext: {
        position: 'absolute',
        bottom: 0,
    },
    text: {
        position: 'absolute',
        top: 0,
    }
}

ViroMaterials.createMaterials({
    arrow: {
        diffuseTexture: require('../assets/arrow.jpg')
    }
});
