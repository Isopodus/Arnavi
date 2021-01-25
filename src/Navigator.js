import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import Splash from './screens/Splash';
import FavoriteLocations from './screens/FavoriteLocations';
import {ViroARSceneNavigator} from "react-viro";
import ARNavigator from "./screens/ARNavigator";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const arnavi = () => <ViroARSceneNavigator initialScene={{ scene: ARNavigator }}/>;

export default function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Splash"}>
                <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="FavoriteLocations" component={FavoriteLocations} options={{headerShown: false}} />
                <Stack.Screen name="AR" component={arnavi} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
