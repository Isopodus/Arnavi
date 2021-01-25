// TODO спинер загрузки при получении изначальных координат пользователя

import React from 'react';
import {MapContainer, StaticMap, DirectionMap} from "../components";
import LinearGradient from "react-native-linear-gradient";
import getTheme from "../global/Style";

export default function Home() {
    const theme = getTheme();
    const styles = getStyles(theme);

    const [goToMode, setGoToMode] = React.useState(false);
    const [mapRef, setMapRef] = React.useState(null);
    const [pins, setPins] = React.useState([]);
    const [points, setPoints] = React.useState([]);
    const [modal, setModal] = React.useState(false);

    return(
        <React.Fragment>
            <MapContainer
                onSetRef={(ref) => setMapRef(ref)}
                pins={pins}
                onPinClick={() => setModal(true)}
                points={points}
            />
            <LinearGradient
                colors={[theme.rgba(theme.black, 1), theme.rgba(theme.black, 0)]}
                style={styles.gradient}
            />
            {goToMode
                ? (
                    <DirectionMap
                        mapRef={mapRef}
                        setPoints={setPoints}
                        onClose={() => {
                            setGoToMode(false);
                            setModal(true);
                        }}
                    />
                )
                : (
                    <StaticMap
                        mapRef={mapRef}
                        setPins={setPins}
                        modal={modal}
                        setModal={setModal}
                        onGoToLocation={() => setGoToMode(true)}
                    />
                )
            }
        </React.Fragment>
    )
}

function getStyles(theme) {
    return {
        gradient: {
            flex: 1,
            width: '100%',
            height: theme.scale(300),
            position: 'absolute',
            top: 0,
        }
    }
}
