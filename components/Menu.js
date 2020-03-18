import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MovieList from './MovieList';
import Settings from './Settings';
import Streamer from './Streamer';
import DownloadList from './DownloadList';


const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Main">
          <Drawer.Screen name="Main" component={MovieList} />
          <Drawer.Screen name="Downloads" component={DownloadList} />
          <Drawer.Screen name="Stream" component={Streamer}/>
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    </NavigationContainer>
    )
}