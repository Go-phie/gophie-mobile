import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';

class Streamer extends Component {

    onBuffer = () => {
      return (
      <View style={styles.backgroundVideo}>
        <Image source={require('../assets/buffering.gif')} />
      </View>
      )
    }

    render() {
        if (!this.props.movieUri){
          ToastAndroid.show("No movie selected for streaming", ToastAndroid.LONG)
        }
        return (
          this.props.movieUri?
            <Video source={{uri: this.props.movieUri}}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            poster={"https://github.com/bisoncorps/gophie/raw/master/assets/reel.png"}
            controls={true} 
            fullscreen={true}/>: null
        )
    }
}



// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const mapStateToProps = state => {
    return {
      movieUri: state.movieUri,
      movie: state.movie,
    };
  };
  
export default connect(mapStateToProps, {})(Streamer);