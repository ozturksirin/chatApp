import React from 'react'
import { store } from '../Redux/store';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Router from './Router';

const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Router />
        </Provider>
      </GestureHandlerRootView>
    </>
  )
}

export default App
