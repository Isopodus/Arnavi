import React, {Component} from 'react';

import {ViroARSceneNavigator} from 'react-viro';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './js/Home';
import HelloWorldSceneAR from './js/HelloWorldSceneAR';


const Stack = createStackNavigator();
export default class App extends Component {
    render() {
        return <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="AR" component={() => <ViroARSceneNavigator initialScene={{scene: HelloWorldSceneAR}}/>}/>
            </Stack.Navigator>
        </NavigationContainer>
    }
}
