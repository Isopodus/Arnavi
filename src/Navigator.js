import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import {ViroARSceneNavigator} from "react-viro";
import HelloWorldSceneAR from "./screens/HelloWorldSceneAR";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const ARNavigator = () => <ViroARSceneNavigator initialScene={{ scene: HelloWorldSceneAR }}/>;

export default function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="AR" component={ARNavigator} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
