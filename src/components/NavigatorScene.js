import React from 'react';
import {ViroARScene, ViroConstants, ViroDirectionalLight, ViroAmbientLight} from "react-viro";

export default class NavigatorScene extends React.Component {

    onTrackingUpdated = (state, reason) => {
        console.log('tracking updated');
        if (state === ViroConstants.TRACKING_UNAVAILABLE) {
            console.log('unavailable');
        } else if (state === ViroConstants.TRACKING_LIMITED) {
            console.log('limited');
        } else if (state === ViroConstants.TRACKING_NORMAL) {
            console.log('normаl');
        }

        if (reason === ViroConstants.TRACKING_REASON_EXCESSIVE_MOTION) {
            console.log('too much motion');
        } else if (reason === ViroConstants.TRACKING_REASON_INSUFFICIENT_FEATURES ) {
            console.log('bad scene for camera');
        }
    }


    render() {
        const {waypoint} = this.props.arSceneNavigator.viroAppProps;
        return <ViroARScene onTrackingUpdated={this.onTrackingUpdated}>
            <ViroAmbientLight color="#FFFFFF" />
            <ViroDirectionalLight
                color="#ffffff"
                direction={[0, -1, 1]}
            />
            {waypoint}
        </ViroARScene>
    }

}
