import React, {Component} from 'react';
import {ViroARSceneNavigator} from 'react-viro';

import HelloWorldSceneAR from './js/HelloWorldSceneAR';
import Home from './js/Home';


export default class ViroSample extends Component {
    constructor() {
        super();

        this.state = {
            isAr: false
        }
    }

    render() {
        const {isAr} = this.state;
        if (!isAr) {
            return <Home onAr={() => this.setState({isAr: true})}/>;
        } else {
            return <ViroARSceneNavigator initialScene={{scene: HelloWorldSceneAR}}/>
        }
    }
}