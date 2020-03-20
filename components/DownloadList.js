import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Download from './Download';
import { downloadMovie, closeMovie, updateDownloadFill, updateDownloadStatus } from '../reducers';


class DownloadList extends Component {
  render(){
    console.disableYellowBox = true;
    const {downloads, updateDownloadFill, updateDownloadStatus} = this.props

    return (
      <View style={styles.container}>
          {Object.keys(downloads).map((key, _) =>
           <Download 
           download={downloads[key]} 
           key={downloads[key].key} 
           updateDownloadFill={updateDownloadFill}
           updateDownloadStatus={updateDownloadStatus}/>
           )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);