import React, { useState, useEffect } from 'react';
import { styles } from '../Assets/Styles/routerStyle';
import { Image, BackHandler, View, Text } from 'react-native';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../Pages/More/Account/Account';
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#0F1828',
                    elevation: 15,
                    borderTopWidth: 0,
                    paddingBottom: 4,
                },
                headerStyle: {
                    backgroundColor: '#0F1828',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    color: '#fff'
                },
            }}

        >
            <Tab.Screen name="Contacts"
                component={Contacts}
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
    )

}

const Router = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#0F1828',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: '#fff',
                }}
            >
                {
                    !isAuth ? (
                        <>
                            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
                            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name='Register' component={Register} />
                            <Stack.Screen name='ProfileCreate' component={ProfileCreate} />
                        </>
                    ) :
                        (
                            <>
                                <Stack.Screen name='Home' component={HomeStackScreen} options={{ headerShown: false }} />
                                <Stack.Screen name='Chat' component={Chat}
                                    options={({ route }) => ({
                                        headerTitle: () => (
                                            <View style={styles.area}>
                                                <Image
                                                    style={styles.image}
                                                    source={
                                                        route.params.users.image
                                                            ? { uri: route.params.users.image }
                                                            : null
                                                    }
                                                />
                                                <Text
                                                    style={styles.userName}
                                                >{route.params.users.firstName + ' ' + route.params.users.lastName}</Text>
                                            </View>
                                        ),
                                    })}

                                />
                                <Stack.Screen name="Messages" component={Messages} />
                                <Stack.Screen name='Menu' component={Menu} />
                                <Stack.Screen name='Account' component={Account} />
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;