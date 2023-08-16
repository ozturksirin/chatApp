import React, { useEffect, useState } from 'react';
import { styles } from '../../Assets/Styles/Pages/contactsStyle';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import User from '../../Assets/Images/icons/userImg.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Contacts = (props) => {
    const { navigation } = props;
    const [users, setUsers] = useState([]);
    const currentUserData = auth().currentUser.uid;

    const getUser = async () => {
        try {
            const userRef = firestore().collection('users').where('authUserId', '!=', currentUserData);
            const querySnapshot = await userRef.get();
            const usersData = [];

            querySnapshot.forEach((documentSnapshot) => {
                const docData = documentSnapshot.data();
                usersData.push(docData);
            });

            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const addNewChat = async (user) => {
        try {
            const checkChat = [currentUserData, user.authUserId];
            const chatRef = firestore().collection('chats').where('users', '==', checkChat);
            const chatQuerySnapshot = await chatRef.get();

            if (!chatQuerySnapshot.empty) {
                const chatDoc = chatQuerySnapshot.docs[0];
                const chatData = chatDoc.data();
                navigation.navigate('Chat', { chatId: chatDoc.id, users: chatData.users });
                return;
            }

            const newChat = firestore().collection('chats');
            const newDocumentRef = newChat.doc();
            await newDocumentRef.set({
                id: newDocumentRef.id,
                date: new Date(),
                users: [currentUserData, user.authUserId],
            });

            navigation.navigate('Chat', { chatId: newDocumentRef.id, users: [currentUserData, user.authUserId] });
        } catch (error) {
            console.error('Error creating or navigating to chat:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {users.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity style={styles.userArea} onPress={() => addNewChat(item)}>
                            <Image source={item.image ? { uri: item.image } : User} style={styles.userImg} />
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
                ))}
            </ScrollView>
        </View>
    );
};

export default Contacts;
