import React from 'react';
import LottieView from 'lottie-react-native';
import spinner from '../assets/animations/spinner';
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import getTheme from "../global/Style";
import {View, Animated, Easing} from 'react-native';

export default function Splash() {
    const status = useSelector(state => state.appReady);
    const { navigate } = useNavigation();
    const theme = getTheme();

    const fadeAnimation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (status) navigate('Home');
        setTimeout(() => {
            Animated.timing(fadeAnimation, {
                toValue: 1,
                easing: Easing.linear(),
                duration: 200
            }).start();
        }, 2000);
    }, [status]);

    return(
        <View style={[theme.rowAlignedCenterVertical, { flex: 1 }]}>
            <LottieView style={{ backgroundColor: theme.black }} source={spinner} autoPlay loop />
            <Animated.Text
                style={[
                    theme.textStyle({
                        font: 'NunitoMedium',
                        color: 'textPlaceholder',
                        size: 14,
                        align: 'center'
                    }),
                    {
                        opacity: fadeAnimation,
                        position: 'absolute',
                        bottom: theme.scale(50),
                    }
                ]}
            >
                Awaiting location update...
            </Animated.Text>
        </View>
    )
}
