import React, { useEffect, useState } from 'react'
import { styles } from '../../Assets/Styles/Pages/contactsStyle'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import User from '../../Assets/Images/icons/userImg.png'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

const Contacts = (props) => {
    const { navigation } = props
    const [users, setUsers] = useState([])
    const currentUserData = auth().currentUser.uid;
    const getUser = async () => {
        const userRef = firestore().collection('users').where('authUserId', '!=', currentUserData);
        userRef.onSnapshot((querySnapshot) => {
            const usersData = [];
            querySnapshot.forEach((documentSnapshot) => {
                const docData = documentSnapshot.data();
                usersData.push(docData);
            });
            setUsers(usersData);
            // console.log('data:', usersData);
        });
    };
    useEffect(() => {
        getUser()
    }, [])
    const addNewChat = async (user) => {
        try {
            const checkChat = [currentUserData, user.authUserId]
            const chatRef = firestore().collection('chats').where('users', '==', checkChat);
            const chat = await chatRef.get();
            if (!chat.empty) {
                navigation.navigate('Chat', { chatId: chat.docs[0].id, users: user })
                return;
            }
            const newChat = firestore().collection('chats')
            const newDocumentRef = newChat.doc();
            await newChat.add({
                id: newDocumentRef.id,
                date: new Date(),
                users: [
                    currentUserData,
                    user.authUserId
                ],
            })
            navigation.navigate('Chat', { chatId: newChat.id, users: user })
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    {
                        users.map((item, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity style={styles.userArea} onPress={() => addNewChat(item)}>
                                        <Image source={
                                            item.image ? { uri: item.image } : User
                                        } style={styles.userImg} />
                                        <View style={{ paddingLeft: 10, flex: 1 }}>
                                            <Text style={styles.name}>
                                                {item?.firstName + ' ' + item?.lastName}
                                            </Text>
                                            <Text style={styles.lastMessage}>
                                                Status
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.seperator} />
                                </View>
                            )
                        }
                        )
                    }
                </ScrollView>
            </View>
        </>
    )
}
export default Contacts
