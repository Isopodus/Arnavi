import React from 'react';
import {ViroBox} from "react-viro";

export default function ARWaypointMarker(props) {
    const {rotation, point} = props;
    return <ViroBox
        height={0.1}
        length={0.1}
        width={0.1}
        scale={[1, 1, 1]}
        materials={["arrow"]}
        position={point ?? [0, 0, 0]}
        rotation={rotation ?? [0, 0, 0]}/>
};
