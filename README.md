# Arnavi

**KNKG** team test app for INT20h hackatone.

**Compiled APK file is <a href="https://github.com/Isopodus/Arnavi/releases/tag/v1.0">here!</a>**

If you wish to build project from scratch repeat this steps:
1. Install Node, yarn, Android SDK;
2. Clone this repository;
3. Run `yarn` in the repository root folder;
4. Connect your device via USB and run `npm start`. Allow USB installation on your phone, after this app should install and start automatically.

## How to use the app

After launchign the app it will prompt you to allow location use and ask to enable GPS. Then there is a loading screen wich awaits for a fresh GPS location. Sometimes GPS sync takes some time, so make sure you are standing in a open/close to the sky place for the best GPS signal.

After GPS sync you will be redirected to the map view. 'Where am I?' button is in the bottom right (if auto relocation didn't work for some reson).
Use location search or tap on the map to select a place to navigate. After selection, click "Create route" to create roadmap, then click "Start trip" to open AR navigation screen. Allow camera usage. Also, app may ask you to install ARCore (if it was not installed by default) to handle AR scene.

Compass-like arrow in the center is heading next waypoint GPS coordinates, which is slightly more accurate than AR markers. ARCore implementation for react-native may involve some markers position offests, ensure your camera is pointing to a well lighted place to minimize errors. Also avoid robust phone motions.

When you approach the next waypoint to less then 5 meters, it is switched to the next one automatically. You can also press "Next" button to switch it manually.

Map icon button to the left opens smapp route preview you can rely onto when navigating through the world.
