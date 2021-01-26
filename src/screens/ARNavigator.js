import React, {Component} from 'react';
import {View, Vibration, Text, TouchableOpacity} from 'react-native';

const {DeviceEventEmitter} = require('react-native');
const ReactNativeHeading = require('react-native-heading');

import {
    ViroARSceneNavigator,
    ViroMaterials,
} from 'react-viro';
import {Icon, MapContainer, NavigatorScene} from "../components";
import { connect } from 'react-redux';

import {bearing, calcCrow, rotatePoint} from "../utils/Coordinates";
import {ARWaypointMarker} from "../components";
import getTheme from "../global/Style";
import LinearGradient from "react-native-linear-gradient";

class ARNavigator extends Component {

    waypoints = [
        // {lat: 47.908953076075925, lng: 33.34762378333839},
        // {lat: 47.908922470775664, lng: 33.34786382274828},

        {lat: 47.90897674964831, lng: 33.34755424400486},
        {lat: 47.90906525721537, lng: 33.34727387825782},
        {lat: 47.909021437650324, lng: 33.347008480603726},
        {lat: 47.908843819726656, lng: 33.34691889326},
        {lat: 47.908806730985496, lng: 33.34701310991839},
        {lat: 47.90879164149896, lng: 33.347184934469375},
        {lat: 47.908774972195374, lng: 33.34752180137761},

        // {lat: 47.89546, lng: 33.33501},
        // {lat: 47.89608, lng: 33.33476},
        // {lat: 47.8957, lng: 33.32971},
        // {lat: 47.89606, lng: 33.33095},
        // {lat: 47.89482, lng: 33.3313},
        // {lat: 47.89607, lng: 33.33287},
    ];

    constructor() {
        super();

        this.headingOnTrackingLost = 0;
        this.headingAfterTrackingLost = 0;
        this.state = {
            waypointIdx: 0,
            heading: 0,
            initialHeading: null,
            initialPosition: null,
            trackingInitialized: false,
            trackingGood: false,
            trackingHeadingFix: 0,
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
            this.setState({
                heading: data,
            });
        });
    }

    componentDidUpdate(prevProps) {
        const {userLocation} = this.props;
        const {initialPosition} = this.state;

        if (prevProps.userLocation !== userLocation)
        {
            this.checkIfNextWaypoint(this.waypoints[this.state.waypointIdx]);

            if (initialPosition === null) {
                this.setState({initialPosition: userLocation});
            }
        }
    }

    updateInitialHeading = () => {
        const {heading} = this.state;
        this.setState({initialHeading: heading})
    };

    updateTrackingStatus = (isNormal, isInitialized) => {
        this.setState({
            trackingInitialized: isInitialized,
            trackingGood: isNormal,
        })
    };

    onTrackingLost = () => {
        const {heading} = this.state;
        console.log('lost', heading);
        this.headingOnTrackingLost = heading;
    };

    onTrackingRecovered = () => {
        const {heading, trackingHeadingFix} = this.state;
        console.log('recovered', heading);
        this.headingAfterTrackingLost = heading;
        this.updateTrackingStatus(true, true);
        const fix = this.headingOnTrackingLost - this.headingAfterTrackingLost;

        console.log('fix', fix);

        this.setState({
            trackingHeadingFix: trackingHeadingFix + fix,
        });
    };

    componentWillUnmount() {
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
    }

    drawWaypoint = (waypointLocation, key) => {
        const {initialHeading, initialPosition, trackingHeadingFix} = this.state;

        //-console.log(initialHeading, !!initialPosition)
        if (waypointLocation && initialHeading !== null && initialPosition !== null) {
            const distance = calcCrow(
                initialPosition.lat, initialPosition.lng,
                waypointLocation.lat, waypointLocation.lng
            );
            const angle = bearing(
                initialPosition.lat, initialPosition.lng,
                waypointLocation.lat, waypointLocation.lng
            );
            let point = [0, 0, -distance];
            point = rotatePoint(point, angle - initialHeading + trackingHeadingFix);

            //console.log(distance, angle, initialHeading, point);

            return <ARWaypointMarker point={point} key={key}/>;
        }
        return null;
    };


    onNextWaypoint = () => {
        console.log('new waypoint idx:', this.state.waypointIdx+1);

        this.setState({
            waypointIdx: this.state.waypointIdx+1,
        });
        Vibration.vibrate([0, 150, 20, 150]);
    };

    checkIfNextWaypoint = (waypointLocation) => {
        if (waypointLocation) {
            const {userLocation} = this.props;
            const distance = calcCrow(
                userLocation.lat, userLocation.lng,
                waypointLocation.lat, waypointLocation.lng
            );
            if (distance < 5) {
                this.onNextWaypoint();
            }
        }
    };

    render() {
        const theme = getTheme();
        const styles = getStyles(theme);
        const {userLocation} = this.props;
        const {waypointIdx, heading} = this.state;
        const isDone = !!!this.waypoints[waypointIdx];

        let distance = 0;
        let angle = 0;
        if (!isDone) {
            distance = calcCrow(
                userLocation.lat, userLocation.lng,
                this.waypoints[waypointIdx].lat, this.waypoints[waypointIdx].lng
            );
            angle = heading - bearing(
                userLocation.lat, userLocation.lng,
                this.waypoints[waypointIdx].lat, this.waypoints[waypointIdx].lng
            );
        }
        return (
            <View style={{flex: 1}}>
                <ViroARSceneNavigator
                    viroAppProps={{
                        waypoint: this.drawWaypoint(this.waypoints[waypointIdx], waypointIdx),
                        updateInitialHeading: this.updateInitialHeading,
                        updateTrackingStatus: this.updateTrackingStatus,
                        onTrackingLost: this.onTrackingLost,
                        onTrackingRecovered: this.onTrackingRecovered,
                    }}
                    initialScene={{
                        scene: NavigatorScene,
                    }}
                />
                <LinearGradient
                    colors={[theme.rgba(theme.black, 1), theme.rgba(theme.black, 0)]}
                    style={styles.gradient}
                />
                <View style={styles.circle} />
                <TouchableOpacity onPress={() => {}} style={styles.touchableDetail}>
                    <Icon
                        name={'layers-outline'}
                        color={theme.textAccent}
                        size={theme.scale(30)}
                        style={styles.roundNextBtn}
                    />
                </TouchableOpacity>
                <View style={styles.compassContainer}>
                    <Icon
                        name={isDone ? 'check' : 'navigation'}
                        color={theme.textAccent}
                        size={theme.scale(40)}
                        style={[styles.roundWaypointCompass, {
                            transform: [
                                { rotateZ: `${-angle}deg` },
                            ]}]
                        }
                    />
                </View>
                {!isDone && <TouchableOpacity onPress={() => this.onNextWaypoint()} style={styles.touchableNext}>
                    <View style={styles.roundNextBtn}>
                        <Text style={styles.primaryText}>Next</Text>
                    </View>
                </TouchableOpacity>}
                <Text style={styles.text}>{`${userLocation.lat}, ${userLocation.lng}, ${distance}`}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userLocation: state.userLocation
});

export default connect(mapStateToProps, null)(ARNavigator);

function getStyles(theme) {
    return {
        roundWaypointCompass: {
            ...theme.rowAlignedCenterVertical,
            height: theme.scale(80),
            width: theme.scale(80),
            padding: theme.scale(10),
            backgroundColor: theme.rgba(theme.black, 0.8),
            borderRadius: 150 / 2,
        },
        roundNextBtn: {
            ...theme.rowAlignedCenterVertical,
            height: theme.scale(65),
            width: theme.scale(65),
            padding: theme.scale(10),
            backgroundColor: theme.rgba(theme.black, 0.8),
            borderRadius: 150 / 2,
        },
        compassContainer: {
            position: 'absolute',
            bottom: ((theme.fullWidth / 1.5) / 2) - theme.scale(35),
            alignSelf: 'center',
        },
        touchableDetail: {
            position: 'absolute',
            bottom: theme.scale(25),
            left: theme.scale(25),
        },
        touchableNext: {
            position: 'absolute',
            bottom: theme.scale(25),
            right: theme.scale(25),
        },
        primaryText: theme.textStyle({
            font: 'NunitoBold',
            color: 'textAccent',
            size: 16,
            align: 'left'
        }),
        text: {
            position: 'absolute',
            top: 0,
        },
        circle: {
            flex: 1,
            position: 'absolute',
            width: theme.fullWidth,
            height: theme.fullWidth,
            bottom: -(theme.fullWidth / 1.5),
            borderWidth: theme.scale(3),
            borderColor: theme.rgba(theme.textAccent, 0.6),
            borderStyle: 'solid',
            borderRadius: theme.fullWidth / 2,
        },
        gradient: {
            flex: 1,
            width: '100%',
            height: theme.scale(250),
            position: 'absolute',
            top: 0,
        }
    }
}
