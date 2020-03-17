import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import { listMovies, openMovie, closeMovie } from '../reducers';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};


class MovieList extends Component {
  componentDidMount() {
    this.props.listMovies("GET", this.props.engine, this.props.listIndex);
  }
  
  render() {
    const { movies, openMovie, closeMovie, popupIsOpen } = this.props;
    return (
      <View style={styles.container}>
      <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          this.props.listMovies("ADD", this.props.engine, this.props.listIndex+1)
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
});

const mapStateToProps = state => {
  // assign keys using uuid since keys returned from API are not unique
  let storedMovies = state.movies.map(movie => ({ key: uuid.v1(), ...movie }));
  return {
    movies: storedMovies,
    engine: state.engine,
    listIndex: state.listIndex,
    popupIsOpen: state.popupIsOpen,
    movie: state.movie,
  };
};

const mapDispatchToProps = {
  listMovies,
  openMovie,
  closeMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);