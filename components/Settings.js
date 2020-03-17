import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Switch
} from 'react-native';
import { Card, Text, ButtonGroup, Button } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import { defaultStyles } from '../styles'

const SHOW_NOTIFICATIONS_KEY = 'notifications';
const THEME_COLOR_KEY = 'theme_color';
const AGE_KEY = 'age';

export default class Settings extends Component {

  state = {
    showNotifications: false,
    age: 18
  }
  colors = [defaultStyles.themecolor.backgroundColor, 'green', 'red', 'purple'];

  componentDidMount() {
    this.loadAsyncData();
  }

  loadAsyncData = async () => {
    try {
      const showNotifications = await AsyncStorage.getItem(SHOW_NOTIFICATIONS_KEY)
      if (showNotifications !== null) {
        this.setState({ showNotifications: JSON.parse(showNotifications) });
      }
    } catch (e) {
      console.log(e)
    }

    try {
      const themeColorIndex = await AsyncStorage.getItem(THEME_COLOR_KEY)
      if (themeColorIndex !== null) {
      }
    } catch (e) {
      console.log(e)
    }

    try {
      const age = await AsyncStorage.getItem(AGE_KEY)
      if (age !== null) {
        this.setState({ age: JSON.parse(age) });
      }
    } catch (e) {
      console.log(e)
    }
  }

  storeNotification = async (key, showNotifications) => {
    try {
      await AsyncStorage.setItem(SHOW_NOTIFICATIONS_KEY, JSON.stringify(showNotifications))
      this.setState({ showNotifications });
    } catch (e) {
      console.log(e);
    }
  }

  storeThemeColors = async (key, themeIndex) => {
    try {
      await AsyncStorage.setItem(THEME_COLOR_KEY, JSON.stringify(themeIndex));
    } catch (e) {
      console.log(e);
    }
  }

  storeAge = async (key, age) => {
    try {
      await AsyncStorage.setItem(AGE_KEY, JSON.stringify(age));
      this.setState({ age });
    } catch (e) {
      console.log(e);
    }
  }

  restoreDefaults = () => {
    this.storeNotification(SHOW_NOTIFICATIONS_KEY, false);
    this.storeThemeColors(THEME_COLOR_KEY, 0);
    this.storeAge(AGE_KEY, 18);
  }

  render() {
    const themeColorIndex = 0;

    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card} title='Notifications' >
          <View style={styles.row}>
            <Text style={styles.text}>Show Notifications</Text>
            <Switch
              style={{ marginLeft: 16 }}
              trackColor={{ true: this.colors[themeColorIndex] }}
              thumbColor='white'
              value={this.state.showNotifications}
              onValueChange={(showNotifications) => {
                this.storeNotification(SHOW_NOTIFICATIONS_KEY, showNotifications);
                console.log(showNotifications)
              }}
            />
          </View>
        </Card>
        <Card containerStyle={styles.card} title='Age' >
          <View style={styles.row}>
            <Text style={styles.text} >{this.state.age}</Text>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={65}
              minimumTrackTintColor={this.colors[themeColorIndex]}
              step={1}
              thumbTintColor='white'
              value={this.state.age}
              onValueChange={(age) => {
                this.storeAge(AGE_KEY, age);
              }}
            />
          </View>
        </Card>
        <Button
          containerStyle={styles.restoreButtonContainer}
          buttonStyle={[styles.text, {
            padding: 16,
            backgroundColor: this.colors[themeColorIndex],
            borderRadius: 10,
          }]}
          onPress={this.restoreDefaults}
          title="Restore Defaults"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#D0D3D4'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    ...defaultStyles.text,
    fontSize: 16,
  },
  slider: {
    width: 250,
    marginLeft: 16
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#EAECEE',
    borderColor: '#ABB2B9',
    borderWidth: 0.3,
    borderRadius: 10,
    width: '90%',
  },
  restoreButtonContainer: {
    margin: 32
  }
});