import React from 'react';
import LottieView from 'lottie-react-native';
import spinner from '../assets/animations/spinner';
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import getTheme from "../global/Style";

export default function Splash() {
    const status = useSelector(state => state.appReady);
    const { navigate } = useNavigation();
    const theme = getTheme();

    React.useEffect(() => {
        if (status) navigate('Home');
    }, [status]);

    return(
        <LottieView style={{ backgroundColor: theme.black }}  source={spinner} autoPlay loop />
    )
}
