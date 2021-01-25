// TODO спинер загрузки при получении изначальных координат пользователя

import React from 'react';
import {MapContainer, StaticMap, DirectionMap} from "../components";
import LinearGradient from "react-native-linear-gradient";
import getTheme from "../global/Style";
import {setAction} from "../store";
import {useDispatch} from "react-redux";
import {getPlaceIdByCoordinated} from '../utils/Geolocation';

export default function Home() {
    const theme = getTheme();
    const styles = getStyles(theme);
    const dispatch = useDispatch();

    const [goToMode, setGoToMode] = React.useState(false);
    const [mapRef, setMapRef] = React.useState(null);
    const [pins, setPins] = React.useState([]);
    const [points, setPoints] = React.useState([]);
    const [modal, setModal] = React.useState(false);

    const onPress = React.useCallback((e) => {
        const {coordinate} = e.nativeEvent;
        getPlaceIdByCoordinated(coordinate)
            .then((res) => {
                if (res.status === 200) {
                    const { data } = res;
                    const { results } = data;
                    dispatch(setAction('place', { placeId: results[0].place_id }));
                }
            });
    }, []);

    return(
        <React.Fragment>
            <MapContainer
                onSetRef={(ref) => setMapRef(ref)}
                pins={pins}
                onPinClick={() => setModal(true)}
                points={points}
                onPress={onPress}
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
                            setPoints([]);
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
