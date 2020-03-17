import { createStore, applyMiddleware } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './index'

const client = axios.create({
    baseURL: 'https://gophie.herokuapp.com',
    responseType: 'json'
  });


export const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)))