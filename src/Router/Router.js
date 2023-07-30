import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Chat from '../Pages/Chat/Chat';
import Login from '../Pages/Auth/Login';
import Contacts from '../Pages/Contacts/Contacts';
import ProfileCreate from '../Pages/Profile/ProfileCreate';
import Register from '../Pages/Auth/Register';
import Menu from '../Pages/More/Menu';
import Messages from '../Pages/Messages/Messages';
import Splash from '../Pages/Splash/Splash';

import { useSelector } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const Router = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    useEffect(() => {
        console.log('isAuth->', isAuth);
    }, [isAuth]);

    return (
        <NavigationContainer>
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
        </NavigationContainer>
    )
};

export default Router;
