import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Download from './Download';
import { downloadMovie } from '../reducers';


class DownloadList extends Component {
  render(){
    console.disableYellowBox = true;
    const {downloads} = this.props

    return (
      <View style={styles.container}>
          {Object.keys(downloads).map((key, _) => <Download download={downloads[key]} key={downloads[key].key}/>)}
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
  };
};

const mapDispatchToProps = {
  downloadMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList);