import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Card } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob'
import Icon from 'react-native-vector-icons/FontAwesome';
import { defaultStyles } from '../styles'

export default class Download extends Component {

    executeCancel = (movie) => {
      const {cancelDownload} = this.props

      // TODO: stop the downloader

      Alert.alert(
        'Cancel Download',
        'Are you sure you want to cancel downloading ' + movie.Title,
        [
          {text: 'No',style: 'cancel'},
          {text: 'Yes', onPress: () => cancelDownload(movie.DownloadLink)},
        ],
        {cancelable: false},
      );
    }

    componentDidMount() {
      const  { download, updateDownloadFill } = this.props
      // download the movie
      // let config = RNFetchBlob.config({
      //   fileCache: true,
      //   overwrite: false,
      // })
      
      // let task = config.fetch('GET', download.DownloadLink, {
      //   //headers
      // }).progress((received, total) => {
      //   if (download.status==='play'){
      //     console.log(download.Title, " downloading at ", (received/total)*100)
      //     updateDownloadFill(download.DownloadLink, (received/total)*100)
      //   }
      // }).then((res) => {
      //   // temp file path
      //   console.log('Saved to ', res.path())
      // }).catch((err) => {
      //   console.log("Pausing movie ", download.Title, err)
      // })
      // // if download status is paused, cancel task
      // if (download.status === 'pause'){
      //   task.cancel()
      // }
    }

    render(){
        const { download, updateDownloadStatus, cancelDownload } = this.props;
        console.log(download.fill)
        return(
            <Card containerStyle={styles.card} title={download.Title} titleNumberOfLines={1} >
            <View style={styles.row}>
              <TouchableHighlight
              style={styles.source}>
                    <Text style={styles.text}>{download.Source.toLowerCase()}</Text>
              </TouchableHighlight>
              <Text>{'    '}</Text>
                <AnimatedCircularProgress
                  size={50}
                  width={10}
                  fill={download.fill? download.fill: 0}
                  tintColor={defaultStyles.themecolor.backgroundColor}
                  // onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#3d5875" >
                  {
                    (fill) => (
                        <Text style={styles.points}>{Math.round(fill)}</Text>
                      )
                  }
                  </AnimatedCircularProgress>
                  {
                    download.status === 'play'? 
                    <Icon.Button
                    name="pause"
                    backgroundColor="#ffffff"
                    color="#000000"
                    iconStyle={styles.iconStyle}
                    onPress={() =>updateDownloadStatus(download.DownloadLink, 'pause')}
                  />: <Icon.Button
                  name="play"
                  backgroundColor="#ffffff"
                  color="#000000"
                  iconStyle={styles.iconStyle}
                  onPress={() => updateDownloadStatus(download.DownloadLink, 'play')}
                />
                  }
                  <Icon.Button
                  name="close"
                  backgroundColor="#ffffff"
                  color="#000000"
                  onPress={() => this.executeCancel(download)}
                />
            </View>
          </Card>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
      points: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '100',
      },
      source: {
        backgroundColor: '#fffa1a',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
      },
      iconStyle: {
        marginLeft: 20, 
        marginRight: 5,
      },
  });