import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Download from './Download';
import { 
  downloadMovie, 
  closeMovie, 
  updateDownloadFill, 
  updateDownloadStatus,
  updateDownloadTask,
  cancelDownload } from '../reducers';


class DownloadList extends Component {
  render(){
    console.disableYellowBox = true;
    const {downloads, updateDownloadFill, updateDownloadStatus, updateDownloadTask, cancelDownload} = this.props

    // Object.keys(downloads).map((key, _) => console.log(downloads[key]))
    return (
      <ScrollView contentContainerStyle={styles.container}>
          {Object.keys(downloads).map((key, _) =>
           <Download 
           key={downloads[key].key} 
           download={downloads[key]} 
           updateDownloadFill={updateDownloadFill}
           updateDownloadStatus={updateDownloadStatus}
           cancelDownload={cancelDownload}
           updateDownloadTask={updateDownloadTask}/>
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
  updateDownloadTask,
  cancelDownload,
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);