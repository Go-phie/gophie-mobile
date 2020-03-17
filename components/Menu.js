import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MovieList from './MovieList';
import Settings from './Settings';
import Streamer from './Streamer';


const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Main">
          <Drawer.Screen name="Main" component={MovieList} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Stream" component={Streamer}/>
        </Drawer.Navigator>
    </NavigationContainer>
    )
}