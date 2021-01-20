import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from "./src/Navigator";

export default function App() {
    React.useEffect(() => {
        StatusBar.setHidden(true);
    }, []);
    return(
        <>
            <Navigator/>
        </>
    )
}
