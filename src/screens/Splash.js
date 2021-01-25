import React from 'react';
import LottieView from 'lottie-react-native';
import spinner from '../assets/animations/spinner';
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

export default function Splash() {
    const status = useSelector(state => state.appReady);
    const { navigate } = useNavigation();

    React.useEffect(() => {
        if (status) navigate('Home');
    }, [status]);

    return(
        <LottieView source={spinner} autoPlay loop />
    )
}
