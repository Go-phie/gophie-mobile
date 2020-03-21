import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Text, ButtonGroup, Button } from 'react-native-elements';
import {setNotifications, selectEngine} from '../reducers'
import AsyncStorage from '@react-native-community/async-storage';
import { defaultStyles } from '../styles'
import {SHOW_NOTIFICATIONS_KEY, ENGINE_KEY} from '../consts'

class Settings extends Component {

  storeNotification = async (showNotifications) => {
    try {
      await AsyncStorage.setItem(SHOW_NOTIFICATIONS_KEY, JSON.stringify(showNotifications))
      this.props.setNotifications(showNotifications)
    } catch (e) {
      console.log(e);
    }
  }

  storeSelectedEngine = async (egnIndex) => {
    try {
      await AsyncStorage.setItem(ENGINE_KEY, JSON.stringify(egnIndex))
      this.props.selectEngine(this.props.engines[egnIndex])
      ToastAndroid.show('Engine set to ' + this.props.engines[egnIndex], ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
    }
  }

  engineToIndex = (engine) => {
    for (var i=0; i< this.props.engines.length; i++){
      if (this.props.engines.length === engine) {
        return i
      }
    }
  }

  restoreDefaults = () => {
    this.storeNotification(false);
    this.storeSelectedEngine(0);
  }

  render(){
    console.disableYellowBox = true;
    const notif = this.props.showNotifications

    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card} title='Notifications' >
          <View style={styles.row}>
            <Text style={styles.text}>Show Notifications</Text>
            <Switch
              style={{ marginLeft: 16 }}
              trackColor={{ true: defaultStyles.themecolor.backgroundColor }}
              thumbColor='white'
              value={notif}
              onValueChange={(showNotifications) => {
                this.storeNotification(showNotifications);
              }}
            />
          </View>
        </Card>
        <Card containerStyle={[styles.card, {marginLeft: 10}]} title='Engine'>
        <ButtonGroup
          selectedIndex={this.engineToIndex(this.props.engine)}
          selectedTextStyle={{color: '#000000'}}
          onPress={this.storeSelectedEngine}
          buttons={this.props.engines}
          selectedButtonStyle={{backgroundColor: defaultStyles.themecolor.backgroundColor}}
          containerStyle={{height: 50, width: 200, borderRadius:10}}
        />
        </Card>
        <Button
          containerStyle={styles.restoreButtonContainer}
          buttonStyle={[styles.text, styles.buttonStyle]}
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
    backgroundColor: '#EAECEE'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...defaultStyles.text,
    fontSize: 16,
  },
  card: {
    alignItems: 'center',
    borderColor: '#ABB2B9',
    borderWidth: 0.3,
    borderRadius: 10,
    width: '90%',
  },
  restoreButtonContainer: {
    margin: 32
  },
  buttonStyle: {
    padding: 16,
    backgroundColor: defaultStyles.themecolor.backgroundColor,
    borderRadius: 10,
  },
  selectedButtonStyle: {
    backgroundColor: defaultStyles.themecolor.backgroundColor,
  }
});

const mapStateToProps = state => {
  return {
    engine: state.engine,
    showNotifications: state.showNotifications,
    engines: state.engines,
  };
};

const mapDispatchToProps = {
  selectEngine,
  setNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);