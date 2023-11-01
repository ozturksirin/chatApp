import React, { useEffect, useState, } from 'react'
import { styles } from '../../Assets/Styles/Pages/chatStyle'
import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import Plus from '../../Assets/Images/icons/plus.png'
import SendM from '../../Assets/Images/icons/send.png'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
const Chat = (props) => {
    const { } = props
    const { chatId, users } = props.route.params;
    const [messages, setMessages] = useState([])
    useEffect(() => {
        // console.log('chatId', chatId);
        // console.log('users', users);
    }, [])
    useEffect(() => {
        return firestore()
            .doc(`messages/${chatId}`)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.data()?.messages ?? []);
            }
            )
    }, [chatId])

    const onSend = (msg = []) => {
        firestore()
            .doc(`messages/${chatId}`)
            .set({
                messages: GiftedChat.append(messages, msg),
            }, { merge: true })
    }

    const handleSendImage = () => {
        launchImageLibrary(
            {
                selectionLimit: 1,
                mediaType: 'photo',
            },
            (response) => {
                if (!response.didCancel && !response.errorCode) {
                    const imageUri = response.assets[0].uri;
                    uploadImage(imageUri);
                }
            }
        );
    };

    const uploadImage = async (uri) => {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const storageRef = storage().ref(`chats/${filename}`);
        const task = storageRef.putFile(uploadUri);

        try {
            await task;
            const url = await storageRef.getDownloadURL();

            const user = {
                _id: auth().currentUser.uid,
                name: users?.firstName,
            };

            const imageMessage = {
                _id: Math.random().toString(36).substring(7),
                createdAt: new Date(),
                user: user,
                image: url,
            };

            onSend([imageMessage]);
        }
        catch (e) {
            console.log(e);
        }
    };

    // const lastMessage = messages[messages.length - 1];

    // console.log('messages', lastMessage);


    return (
        <>
            <View style={styles.container} >
                <GiftedChat
                    showAvatarForEveryMessage={true}
                    showUserAvatar={false}
                    renderAvatar={() => null}
                    messages={messages.map(x => ({
                        ...x,
                        createdAt: x.createdAt?.toDate()
                    }))}
                    onSend={onSend}
                    user={{
                        _id: auth().currentUser.uid,
                        name: users?.firstName,
                        avatar: null,
                    }}
                    renderBubble={(props) => (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: '#0F1828',
                                },
                                right: {
                                    backgroundColor: '#375FFF'
                                },
                            }}
                            textStyle={{
                                left: {
                                    color: '#F7F7FC',
                                },
                                right: {
                                    color: '#F7F7FC',
                                },
                            }}
                        />
                    )}
                    renderInputToolbar={(props) => (
                        <View style={styles.inputArea}>
                            <TouchableOpacity
                                onPress={handleSendImage}
                                {...props}
                                style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 8 }}>
                                <Image source={Plus} style={{ width: 28, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <TextInput
                                {...props}
                                value={props.text}
                                placeholder='Your message'
                                placeholderTextColor={'#F7F7FC'}
                                onChangeText={
                                    (text) => {
                                        props.onTextChanged(text);
                                    }
                                }
                                style={styles.input}
                            />
                            <TouchableOpacity
                                {...props}
                                onPress={() => {
                                    if (props.text && props.text.trim().length > 0) {
                                        props.onSend({ text: props.text.trim() }, true);
                                    }
                                }}
                                style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 6 }}>
                                <Image
                                    source={SendM}
                                    style={{
                                        width: 26,
                                        height: 26,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View >
        </>
    )
}
export default Chat
