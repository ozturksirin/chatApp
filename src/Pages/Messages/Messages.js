import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import User from '../../Assets/Images/icons/userImg.png'
import { styles } from '../../Assets/Styles/Pages/messagesStyle'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
const Messages = (props) => {
    const { navigation } = props;
    const [chat, setChat] = useState([]);
    const currentUserData = auth().currentUser;

    const ChatData = async () => {
        try {
            const chatRef = firestore().collection('chats');
            let querySnapshot;

            if (currentUserData.uid === chat[0]?.users[0]) {
                querySnapshot = await chatRef.where('users', 'array-contains', currentUserData.uid).where('receivingUserStatus', '==', true).get();
            }
            else {
                querySnapshot = await chatRef.where('users', 'array-contains', currentUserData.uid).where('sentByUserStatus', '==', true).get();
            }

            // if (currentUserData.uid == chat[0]) {
            //     querySnapshot = await chatRef.where('sentByUserStatus', '==', true).get();
            // }
            // else {
            //     querySnapshot = await chatRef.where('receivingUserStatus', '==', true).get();
            // }


            const chats = [];
            querySnapshot.forEach((documentSnapshot) => {
                const docData = documentSnapshot.data();
                chats.push(docData);
            });

            // console.log('chats', chats);
            return chats;
        }
        catch (error) {
            throw error;
        }
    };
    const UsersData = async (chatData) => {
        try {
            const otherUserId = chatData.users.find(uid => uid !== currentUserData.uid);
            const userRef = firestore().collection('users').where('authUserId', '==', otherUserId);
            const querySnapshot = await userRef.get();
            const usersData = [];
            querySnapshot.forEach((documentSnapshot) => {
                const docData = documentSnapshot.data();
                usersData.push(docData);
            });
            return usersData;
        }
        catch (error) {
            throw error;
        }
    };
    const getChat = async () => {
        try {
            const chats = await ChatData();
            const chatWithUsersPromises = chats.map(async (chatData) => {
                const usersData = await UsersData(chatData);
                return {
                    ...chatData,
                    otherUser: usersData[0], // Assuming usersData should contain only one user
                };
            });
            const chatsWithUsers = await Promise.all(chatWithUsersPromises);
            setChat(chatsWithUsers);
            // console.log('data:', chatsWithUsers);
        }
        catch (error) {
            console.error('Error fetching chat:', error);
        }
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getChat();
        });
        return unsubscribe;
    }, [navigation]);

    const onLongPress = (chatId) => {
        Alert.alert(
            "Delete Chat",
            "Are you sure you want to delete this chat?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        if (currentUserData.uid === chat[0].users[0]) {
                            firestore().doc(`chats/${chatId}`).update({
                                sentByUserStatus: false,
                            })
                                .then(() => {
                                    console.log("Chat deleted!");
                                    getChat();
                                })
                                .catch((error) => {
                                    console.error("Error deleting chat:", error);
                                });
                        }
                        else {
                            firestore().doc(`chats/${chatId}`).update({
                                receivingUserStatus: false,
                            })
                                .then(() => {
                                    console.log("Chat deleted!");
                                    getChat();
                                })
                                .catch((error) => {
                                    console.error("Error deleting chat:", error);
                                });
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            {
                chat.length === 0 ?
                    <View style={styles.noMessagesContainer}>
                        <Text style={styles.noMessagesText}>You have not yet spoken. Start a conversation now!</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        {
                            chat.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity style={styles.userArea} onPress={() => {
                                            // console.log("Chat Pressed:", item);
                                            navigation.navigate('Chat', { chatId: item.id, users: item.otherUser });
                                        }}
                                            onLongPress={
                                                () => {
                                                    onLongPress(item.id);
                                                    console.log('item.id(chatId)', item.id);
                                                }
                                            }
                                        >
                                            <Image source={
                                                item.otherUser.image ? { uri: item.otherUser.image } : User
                                            } style={styles.userImg} />
                                            <View style={{ paddingLeft: 10, flex: 1 }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <Text style={styles.name}> {item.otherUser.firstName + ' ' + item.otherUser.lastName} </Text>
                                                    <Text style={styles.date}>Today</Text>
                                                </View>
                                                <View style={styles.content}>
                                                    <Text style={styles.lastMessage}>
                                                        Last Message
                                                    </Text>
                                                    <View style={styles.notificationArea}>
                                                        <Text style={styles.notification}>1</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View >
            }
        </>
    )
}
export default Messages 
