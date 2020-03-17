import { 
        GET_MOVIES,
        ADD_MOVIES,
        ADD_MOVIES_SUCCESS,
        GET_MOVIES_FAIL, 
        ADD_MOVIES_FAIL,
        GET_MOVIES_SUCCESS,
        OPEN_MOVIE_POPUP,
        CLOSE_MOVIE_POPUP,
        SHOW_NOTIFICATIONS,
        SELECT_ENGINE,
        SELECT_ENGINE_SUCCESS,
    } from './types'


const defaultState = {
  movies: [],
  engine: 'netnaija',
  engines: ['netnaija', 'fzmovies'],
  listIndex: 1,
  popupIsOpen: false,
  movieUri: "",
  showNotifications: false,
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

export function setNotifications(value){
  return {
    type: SHOW_NOTIFICATIONS,
    payload: {
      showNotifications: value
    }
  }
}

export function selectEngine(value){
  return {
    type: SELECT_ENGINE,
    payload: {
      engine: value,
      request: {
        url: `/list?page=1&engine=${value}`
      }
    }
  }
}


// reducer
export default function reducer(state=defaultState, action) {
  // FIXME: does not load new pages instead keeps reloading page1
  switch (action.type) {
    case SELECT_ENGINE:
      console.log("In select engine to pick ", action.payload.engine)
      return {...state, engine: action.payload.engine, loading:true}
    case GET_MOVIES:
    case ADD_MOVIES:
      return { ...state, loading: true };
    case GET_MOVIES_SUCCESS:
    case SELECT_ENGINE_SUCCESS:
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
    case SHOW_NOTIFICATIONS:
      return {...state, showNotifications: action.payload.showNotifications}
    default:
      return state;
  }
}


