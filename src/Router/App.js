import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../Pages/Chat/Chat';
import Login from '../Pages/Auth/Login';
import { store } from '../Redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();


const Router = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
