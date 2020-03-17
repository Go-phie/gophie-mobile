import { 
        GET_MOVIES,
        ADD_MOVIES,
        ADD_MOVIES_SUCCESS,
        GET_MOVIES_FAIL, 
        ADD_MOVIES_FAIL,
        GET_MOVIES_SUCCESS,
        OPEN_MOVIE_POPUP,
        CLOSE_MOVIE_POPUP,
    } from './types'


const defaultState = {
  movies: [],
  engine: 'netnaija',
  listIndex: 1,
  popupIsOpen: false,
  movieUri: ""
}

// reducer
export default function reducer(state=defaultState, action) {
  // FIXME: does not load new pages instead keeps reloading page1
  switch (action.type) {
    case GET_MOVIES:
    case ADD_MOVIES:
      return { ...state, loading: true };
    case GET_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.payload.data };
    case ADD_MOVIES_SUCCESS:
      return {...state, listIndex: state.listIndex+1, movies: [...state.movies, ...action.payload.data]};
    case GET_MOVIES_FAIL:
    case ADD_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while getting movies'
      };
    case OPEN_MOVIE_POPUP:
      movie = action.payload.movie
      return {...state, popupIsOpen: true, movie, movieUri: movie.DownloadLink}
    case CLOSE_MOVIE_POPUP:
      return {...state, popupIsOpen:false}
    default:
      return state;
  }
}


// actions

export function openMovie(movie){
  return {
    type: OPEN_MOVIE_POPUP,
    payload: {
      movie: movie
    }
  }
}

export function closeMovie(){
  return {
    type: CLOSE_MOVIE_POPUP
  }
}

export function listMovies(mode, engine, page) {
  if (mode === "ADD"){
    return {
      type: ADD_MOVIES,
      payload: {
        request: {
          url: `/list?page=${page}&engine=${engine}`
        }
      }
    };
  } else if (mode=== "GET") {
    return {
      type: GET_MOVIES,
      payload: {
        request: {
          url: `/list?page=${page}&engine=${engine}`
        }
      }
    };
  }
}

export function searchMovies(engine, query) {
    return {
        type: GET_MOVIES,
        payload: {
            request: {
                url: `/search?query=${query}&engine=${engine}`
            }
        }
    }
}