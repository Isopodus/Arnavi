import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import Splash from './screens/Splash';
import FavoriteLocations from './screens/FavoriteLocations';
import ARNavigator from "./screens/ARNavigator";
import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";

const Stack = createStackNavigator();

const arnavi = () => <ARNavigator/>;

export default function Navigator() {
    const status = useSelector(state => state.appReady);
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"AR"}>
                {!status && <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />}
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="FavoriteLocations" component={FavoriteLocations} options={{headerShown: false}} />
                <Stack.Screen name="AR" component={arnavi} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
