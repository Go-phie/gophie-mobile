import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultStyles } from '../styles'

export default class Download extends Component {
    render(){
        const { download } = this.props;
        return(
            <Card containerStyle={styles.card} title='Notifications' >
            <View style={styles.row}>
                <Text style={styles.text}>Downloading {download.Title}</Text>
            </View>
          </Card>
        );
    }
}

const styles = StyleSheet.create({
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
  });