import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './reducers/configureStore'
import Menu from './components/Menu'

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
          <Menu />
      </Provider>
    );
  }
}

