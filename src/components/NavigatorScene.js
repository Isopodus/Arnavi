import React from 'react';
import {ViroARScene} from "react-viro";

export default class NavigatorScene extends React.Component {

    render() {
        const {waypoint} = this.props.arSceneNavigator.viroAppProps;
        return <ViroARScene>
            {waypoint}
        </ViroARScene>
    }

}
