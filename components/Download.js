import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Card } from 'react-native-elements';
import {FileSystem} from 'react-native-unimodules';
import Icon from 'react-native-vector-icons/FontAwesome';
import { defaultStyles } from '../styles'

export default class Download extends Component {

    executeCancel = async (movie, cancelDownload) => {
      // TODO: stop the downloader

      Alert.alert(
        'Cancel Download',
        'Are you sure you want to cancel downloading ' + movie.Title,
        [
          {text: 'No',style: 'cancel'},
          {text: 'Yes', onPress: async () => {
            if (movie.task && movie.task.resumeData){
              await movie.task.pauseAsync();
            }
            cancelDownload(movie.DownloadLink)
          }
          },
        ],
        {cancelable: false},
      );
    }

    executePlay = async (movie, updateDownloadStatus) => {
      updateDownloadStatus(movie.DownloadLink, 'play')
      if (movie.task && movie.task.resumeData){
        try {
          const { uri } = await movie.task.resumeAsync();
          console.log('Finished downloading to ', uri);
        } catch (e) {
          console.error(e);
        }
      }
    }

    executePause = async (movie, updateDownloadStatus) => {
      updateDownloadStatus(movie.movieLink, 'pause')
      if (movie.task && movie.task.resumeData){
        try {
          const { uri } = await movie.task.pauseAsync();
          console.log('Finished downloading to ', uri);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // executeDownload = async (movie) => {
    //   if(movie.task && !movie.fill){
    //     try {
    //       const { uri } = await movie.task.downloadAsync();
    //       console.log('Finished downloading to ', uri);
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // }

    async UNSAFE_componentWillReceiveProps(nextProps) {
      const {download} = nextProps
      if(download.task && !download.resumeData){
        try {
          const {uri} = await download.task.downloadAsync();
          console.log('Finished downloading to', uri)
        } catch(e){
          console.error(e)
        }
      }
    }


    async componentDidMount(){
      const {download, updateDownloadFill, updateDownloadTask} = this.props

      const progressCallback = downloadProgress => {
        const progress = (downloadProgress.totalBytesWritten/downloadProgress.totalBytesExpectedToWrite) * 100
        console.log(progress)
        updateDownloadFill(download.DownloadLink, progress)
      }
      if (!download.task){
        const downloadResumable = FileSystem.createDownloadResumable(
          download.DownloadLink,
          FileSystem.documentDirectory + download.Title.replace(/ /g,'') + ".mp4",
          {},
          progressCallback
        );
        updateDownloadTask(download.DownloadLink, downloadResumable)
      }
    }
    

    render(){
        const { download, cancelDownload, updateDownloadStatus } = this.props;
        // this.executeDownload(download)
        return(
            <Card containerStyle={styles.card} title={download.Title} titleNumberOfLines={1} >
            <View style={styles.row}>
              <TouchableHighlight
              style={styles.source}>
                    <Text style={styles.text}>{download.Source.toLowerCase()}</Text>
              </TouchableHighlight>
              <Text>{'    '}</Text>
                <AnimatedCircularProgress
                  size={60}
                  width={10}
                  fill={download.fill? download.fill: 0}
                  tintColor={defaultStyles.themecolor.backgroundColor}
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
                    onPress={() =>this.executePause(download, updateDownloadStatus)}
                  />: <Icon.Button
                  name="play"
                  backgroundColor="#ffffff"
                  color="#000000"
                  iconStyle={styles.iconStyle}
                  onPress={() => this.executePlay(download, updateDownloadStatus)}
                />
                  }
                  <Icon.Button
                  name="close"
                  backgroundColor="#ffffff"
                  color="#000000"
                  onPress={() => this.executeCancel(download, cancelDownload)}
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
        fontSize: 12,
        fontWeight: '100',
      },
      source: {
        backgroundColor: '#fffa1a',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
      },
      iconStyle: {
        marginLeft: 5, 
        marginRight: 5,
      },
  });