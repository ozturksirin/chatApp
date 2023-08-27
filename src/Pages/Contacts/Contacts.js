import React, { useEffect, useState } from 'react';
import { styles } from '../../Assets/Styles/Pages/contactsStyle';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import User from '../../Assets/Images/icons/userImg.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
            const currentUserUid = auth().currentUser.uid;
            const otherUserUid = user.authUserId;
            const users = [currentUserUid, otherUserUid];
            users.sort(); // Sort user IDs to ensure consistent order
            const chatRef = firestore().collection('chats').where('users', '==', users);
            const chatQuerySnapshot = await chatRef.get();
            if (!chatQuerySnapshot.empty) {
                const chatDoc = chatQuerySnapshot.docs[0];
                const chatData = chatDoc.data();
                navigation.navigate('Chat', { chatId: chatDoc.id, users: user });
                return;
            }
            const newChat = firestore().collection('chats');
            const newDocumentRef = newChat.doc();
            await newDocumentRef.set({
                id: newDocumentRef.id,
                date: new Date(),
                users: users,
            });
            navigation.navigate('Chat', { chatId: newDocumentRef.id, users: user });
        } catch (error) {
            console.error('Error creating or navigating to chat:', error);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                {users.map((item, index) => (
                    <View key={index}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 8
                        }}>
                            <TouchableWithoutFeedback onPress={() => console.log('feedback')}>
                                <Image source={item.image ? { uri: item.image } : User} style={styles.userImg} />
                            </TouchableWithoutFeedback>

                            <TouchableOpacity style={styles.userArea} onPress={() => {
                                // console.log("Chat Pressed:", item);
                                addNewChat(item);
                            }}>
                                <View style={{ paddingLeft: 10, flex: 1 }}>
                                    <Text style={styles.name}>
                                        {item?.firstName + ' ' + item?.lastName}
                                    </Text>
                                    <Text style={styles.lastMessage}>
                                        Status
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.seperator} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Contacts;
