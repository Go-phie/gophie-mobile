import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar } from 'react-native-elements';
import { 
  listMovies,
  openMovie, 
  closeMovie, 
  setNotifications, 
  selectEngine,
  updateSearch,
 } from '../reducers';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';
import {ENGINE_KEY, SHOW_NOTIFICATIONS_KEY} from '../consts'


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

class MovieList extends Component {
  componentDidMount() {
    this.requestPermissions();
    this.loadAsyncData();
    this.props.listMovies("GET", this.props.engine, this.props.listIndex);
  }

  requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]
      );
      Object.values(granted).map(function(val, _){
        if (val!== "granted"){
          console.log('One permission denied');
        }
      })
    } catch (err) {
      console.warn(err);
    }
  }

  loadAsyncData = async () => {
    try {
      const sNotifications = await AsyncStorage.getItem(SHOW_NOTIFICATIONS_KEY)
      if (sNotifications !== null) {
        this.props.setNotifications(JSON.parse(sNotifications))
      }
    } catch (e) {
      console.log(e)
    }

    try {
      const egnIndex = await AsyncStorage.getItem(ENGINE_KEY)
      if (egnIndex !== null) {
        this.props.selectEngine(this.props.engines[JSON.parse(egnIndex)])
        console.log(this.props.engines[JSON.parse(egnIndex)])
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  render() {
    const { movies, searchloader, openMovie, query, updateSearch, engine, listMovies, listIndex } = this.props;
    return (
      <View style={styles.container}>
        <SearchBar
        placeholder="Search movie ..."
        onChangeText={(query) => updateSearch(query, engine)}
        value={query}
        containerStyle={[styles.searchBar, {height: 50}]}
        onCancel={() =>listMovies("GET", engine, 1)}
        inputContainerStyle={styles.searchBar}
        showLoading={searchloader}
      />
      <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent) && query==="") {
          listMovies("ADD", engine, listIndex+1)
        }
      }}
      scrollEventThrottle={400}>
      {movies.map((movie) => <MoviePoster movie={movie} key={movie.key} onOpen={openMovie}/>)}
      <MoviePopup />
    </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  }
});

const mapStateToProps = state => {
  // assign keys using uuid since keys returned from API are not unique
  let storedMovies = state.movies.map(movie => ({ key: uuid.v1(), ...movie }));
  return {
    movies: storedMovies,
    engine: state.engine,
    engines: state.engines,
    listIndex: state.listIndex,
    popupIsOpen: state.popupIsOpen,
    movie: state.movie,
    showNotifications: state.showNotifications,
    query: state.query,
    searchloader: state.searchloader,
  };
};

const mapDispatchToProps = {
  listMovies,
  openMovie,
  closeMovie,
  setNotifications,
  selectEngine,
  updateSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);