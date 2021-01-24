import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import {ViroARSceneNavigator} from "react-viro";
import ARNavigator from "./screens/ARNavigator";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const arnavi = () => <ViroARSceneNavigator initialScene={{ scene: ARNavigator }}/>;

export default function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="AR" component={arnavi} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
