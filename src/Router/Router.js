import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Chat from '../Pages/Chat/Chat';
import Login from '../Pages/Auth/Login';
import Contacts from '../Pages/Contacts/Contacts';
import ProfileCreate from '../Pages/Profile/ProfileCreate';
import Register from '../Pages/Auth/Register';
import Menu from '../Pages/More/Menu';
import Messages from '../Pages/Messages/Messages';
import Splash from '../Pages/Splash/Splash';

import chats from '../Assets/Images/icons/chats.png'
import accountTab from '../Assets/Images/icons/accountTab.png'
import more from '../Assets/Images/icons/more.png'
import { useSelector } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const HomeStackScreen = () => {
    const isAuth = useSelector((state) => state.user.isAuth);

    return (
        <Stack.Navigator initialRouteName='Splash'>
            {
                !isAuth ? (
                    <>
                        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Register' component={Register} />
                        <Stack.Screen name='ProfileCreate' component={ProfileCreate} />
                    </>
                ) :
                    (
                        <>
                            <Stack.Screen name="Contacts" component={Contacts} />
                            <Stack.Screen name='Chat' component={Chat} />
                            <Stack.Screen name="Messages" component={Messages} />
                            <Stack.Screen name='Menu' component={Menu} />
                        </>
                    )
            }
        </Stack.Navigator>
    );
}

const Router = (props) => {
    const { Tab } = props;
    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        console.log('isAuth->', isAuth);
    }, [isAuth]);

    return (
        <NavigationContainer>
            {
                isAuth ? (
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
                ) : (
                    <HomeStackScreen />
                )
            }
        </NavigationContainer>
    )
};

export default Router;
