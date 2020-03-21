import { 
        GET_MOVIES,
        ADD_MOVIES,
        SEARCH_MOVIE,
        SEARCH_MOVIE_SUCCESS,
        SEARCH_MOVIE_FAILURE,
        ADD_DOWNLOAD,
        ADD_MOVIES_SUCCESS,
        GET_MOVIES_FAIL, 
        ADD_MOVIES_FAIL,
        GET_MOVIES_SUCCESS,
        OPEN_MOVIE_POPUP,
        CLOSE_MOVIE_POPUP,
        SHOW_NOTIFICATIONS,
        SELECT_ENGINE,
        SELECT_ENGINE_SUCCESS,
        UPDATE_DOWNLOAD_FILL,
        UPDATE_DOWNLOAD_STATUS,
        CANCEL_DOWNLOAD,
    } from './types'


const defaultState = {
  movies: [],
  engine: 'netnaija',
  engines: ['netnaija', 'fzmovies'],
  listIndex: 1,
  popupIsOpen: false,
  movieUri: "",
  showNotifications: false,
  downloads: {},
  query: "",
}

// actions
export function openMovie(movie){
  return {
    type: OPEN_MOVIE_POPUP,
    payload: {
      movie
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
        },
      }
    };
  } else if (mode=== "GET") {
    return {
      type: GET_MOVIES,
      payload: {
        request: {
          url: `/list?page=${page}&engine=${engine}`
        },
      }
    };
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
        url: `/list?page=${1}&engine=${value}`
      }
    }
  }
}

export function downloadMovie(){
  return {
    type: ADD_DOWNLOAD
  }
}

export function cancelDownload(movielink){
  return {
    type: CANCEL_DOWNLOAD,
    payload: {
      movielink
    }
  }
}

// update percentage of a particular download
export function updateDownloadFill(movielink, fill){
  return {
    type: UPDATE_DOWNLOAD_FILL,
    payload: {
      movielink,
      fill,
    }
  }
}

// update download status between pause and play
export function updateDownloadStatus(movielink, status){
  if (status === 'pause' || status === 'play'){
    console.log('updating status to ', status)
    return {
      type: UPDATE_DOWNLOAD_STATUS,
      payload: {
        movielink,
        status
      }
    }
  }
}

export function updateSearch(query, engine){
  if (query !== ""){
    return {
      type: SEARCH_MOVIE,
      payload: {
        request: {
            url: `/search?query=${encodeURI(query)}&engine=${engine}`
        },
        query
    }
    }
  }
  return {
    type: GET_MOVIES,
    payload: {
      request: {
        url: `/list?page=1&engine=${engine}`
      }
    }
  }
}

function validMovie(movie) {
  if (movie.CoverPhotoLink !== "" && !movie.DownloadLink.endsWith('/download'))
  {
    return true
  }
  return false
}

// reducer
export default function reducer(state=defaultState, action) {
  console.log(action.type)
  switch (action.type) {
    case GET_MOVIES:
    case ADD_MOVIES:
      return { ...state, loading: true, query: "" };
    case ADD_DOWNLOAD:
      const download = {...state.movie, status: 'play'}
      const newdownloads = {...state.downloads}
      if (!(download.DownloadLink in state.downloads)){
        console.log("Adding ", download.Title, " to downloads")
        newdownloads[download.DownloadLink] = download
      }
      return {...state, downloads: newdownloads}
    case UPDATE_DOWNLOAD_STATUS:
        const statusdownloads = {...state.downloads}
        statusdownloads[action.payload.movielink] = {
          ...statusdownloads[action.payload.movielink],
          status: action.payload.status,
        }
        return {...state, downloads: statusdownloads}
    case UPDATE_DOWNLOAD_FILL:
      const updateddownloads = {...state.downloads}
      updateddownloads[action.payload.movielink] = {
        ...updateddownloads[action.payload.movielink],
        fill: action.payload.fill,
      }
      return {...state, downloads: updateddownloads}
    case CANCEL_DOWNLOAD:
      const nonCancelledDownloads = {...state.downloads}
      delete nonCancelledDownloads[action.payload.movielink]
      return {...state, downloads: nonCancelledDownloads}
    case SEARCH_MOVIE:
      return {...state, loading: true, query: action.payload.query}
    case SEARCH_MOVIE_SUCCESS:
      if (action.payload.data !== null) {
        console.log(action.payload.data)
        return {...state, loading: false, movies: action.payload.data.filter(validMovie)}
      }
      return {...state, loading: false}
    case SEARCH_MOVIE_FAILURE:
      return {...state, loading: false}
    case SELECT_ENGINE:
      return {...state, engine: action.payload.engine, loading:true}
    case GET_MOVIES_SUCCESS:
    case SELECT_ENGINE_SUCCESS:
      return { ...state, loading: false, movies: action.payload.data.filter(validMovie) };
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
      return {...state, popupIsOpen: true, movie: action.payload.movie, movieUri: action.payload.movie.DownloadLink}
    case CLOSE_MOVIE_POPUP:
      return {...state, popupIsOpen:false}
    case SHOW_NOTIFICATIONS:
      return {...state, showNotifications: action.payload.showNotifications}
    default:
      return state;
  }
}


