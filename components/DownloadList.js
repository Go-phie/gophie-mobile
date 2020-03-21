import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Download from './Download';
import { 
  downloadMovie, 
  closeMovie, 
  updateDownloadFill, 
  updateDownloadStatus,
  cancelDownload } from '../reducers';


class DownloadList extends Component {
  render(){
    console.disableYellowBox = true;
    const {downloads, updateDownloadFill, updateDownloadStatus, cancelDownload} = this.props

    return (
      <ScrollView contentContainerStyle={styles.container}>
          {Object.keys(downloads).map((key, _) =>
           <Download 
           download={downloads[key]} 
           key={downloads[key].key} 
           updateDownloadFill={updateDownloadFill}
           updateDownloadStatus={updateDownloadStatus}
           cancelDownload={cancelDownload}/>
           )}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#EAECEE'
  },
});

const mapStateToProps = state => {
  return {
    downloads: state.downloads,
    movie: state.movie,
  };
};

const mapDispatchToProps = {
  downloadMovie,
  closeMovie,
  updateDownloadFill,
  updateDownloadStatus,
  cancelDownload,
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);