import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../Pages/Chat/Chat';
import Login from '../Pages/Auth/Login';
import { store } from '../Redux/store';
import { Provider } from 'react-redux';
import Contacts from '../Pages/Contacts/Contacts';
import ProfileCreate from '../Pages/Profile/ProfileCreate';
import Register from '../Pages/Auth/Register';
import Menu from '../Pages/More/Menu';
import Messages from '../Pages/Messages/Messages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import chats from '../Assets/Images/icons/chats.png'
import accountTab from '../Assets/Images/icons/accountTab.png'
import more from '../Assets/Images/icons/more.png'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ProfileCreate' component={ProfileCreate} />

      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name='Menu' component={Menu} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}

const Router = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#0F1828',
              elevation: 15,
              borderTopWidth: 0,
              paddingBottom: 4,
            },
          }}
        >
          <Tab.Screen name="Contacts1"
            component={HomeStackScreen}
            screenOptions={{ headerShown: false }}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={accountTab}
                  resizeMode='contain'
                  style={{
                    tintColor: focused ? '#fff' : '#748c94',
                  }}
                />
              ),
            }}
          />
          <Tab.Screen name="Messages" component={Messages}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={chats}
                  resizeMode='contain'
                  style={{
                    tintColor: focused ? '#fff' : '#748c94',
                  }}
                />
              ),
            }}
          />
          <Tab.Screen name='More' component={Menu}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={more}
                  resizeMode='contain'
                  style={{
                    tintColor: focused ? '#fff' : '#748c94',
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

export default Router;
