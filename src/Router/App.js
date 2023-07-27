import React from 'react'
import { store } from '../Redux/store';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Router from './Router';



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Router Tab={Tab} />
        </Provider>
      </GestureHandlerRootView>
    </>
  )
}

export default App
