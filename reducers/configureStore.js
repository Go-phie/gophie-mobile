import { createStore, applyMiddleware } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './index'

let authorization = `Bearer ${process.env.API_KEY}`;
const client = axios.create({
    baseURL: 'https://deploy-gophie.herokuapp.com',
//    baseURL: 'http://192.168.43.166:9000',
    responseType: 'json',
    headers: {
      common: {
        Authorization: authorization ,
      }
    },
  });


export const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)))
