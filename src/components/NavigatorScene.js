import React from 'react';
import {ViroARScene, ViroConstants, ViroDirectionalLight, ViroAmbientLight} from "react-viro";

export default class NavigatorScene extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isTrackingGood: false,
        }
    }

    componentDidMount() {
        console.log('scene mounted')
    }

    onTrackingUpdated = (state, reason) => {
        console.log('tracking updated');
        if (state === ViroConstants.TRACKING_UNAVAILABLE) {
            console.log('unavailable');
            this.setState({isTrackingGood: false});
        } else if (state === ViroConstants.TRACKING_LIMITED) {
            console.log('limited');
            this.setState({isTrackingGood: true});
        } else if (state === ViroConstants.TRACKING_NORMAL) {
            console.log('normаl');
            this.setState({isTrackingGood: true});
        }

        if (reason === ViroConstants.TRACKING_REASON_EXCESSIVE_MOTION) {
            console.log('too much motion');
        } else if (reason === ViroConstants.TRACKING_REASON_INSUFFICIENT_FEATURES ) {
            console.log('bad scene for camera');
        }
    }

    onCameraTransformUpdate = ({cameraTransform}) => {
        //console.log(cameraTransform.rotation[1]);
    }


    render() {
        const {waypoint} = this.props.arSceneNavigator.viroAppProps;
        return <ViroARScene
            onTrackingUpdated={this.onTrackingUpdated}
            onCameraTransformUpdate={this.onCameraTransformUpdate}
        >
            <ViroAmbientLight color="#FFFFFF" />
            <ViroDirectionalLight
                color="#ffffff"
                direction={[0, -1, 1]}
            />
            {this.state.isTrackingGood && waypoint}
        </ViroARScene>
    }

}
