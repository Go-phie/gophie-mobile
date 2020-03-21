import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { defaultStyles } from '../styles'

const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 3;

export default class MoviePoster extends Component {
    render(){
        const { movie, onOpen } = this.props;
        return(
            <TouchableOpacity style={styles.container} onPress={() => {onOpen(movie)}}>
            <View style={styles.imageContainer}>
            <Image 
            style={styles.image}
            source={{uri: movie.CoverPhotoLink}}
            />
            </View>
            <Text 
              style={styles.title}
              numberOfLines={1}>{movie.Title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
      marginBottom: 10,
      height: (height - 40) / rows - 10,
      width: (width - 10) / cols - 10,
   
    },
    imageContainer: {
      flex: 1, // take up all available space
    },
    image: {
      borderRadius: 10,                 // rounded corners
      ...StyleSheet.absoluteFillObject, // fill up all space in a container
    },
    title: {
      ...defaultStyles.text,
      fontSize: 14,
      marginTop: 4,
    },
  });