import React, { useEffect, useState, } from 'react'
import { styles } from '../../Assets/Styles/Pages/chatStyle'
import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import Plus from '../../Assets/Images/icons/plus.png'
import SendM from '../../Assets/Images/icons/send.png'
import { GiftedChat, Bubble, Composer } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Chat = (props) => {
    const { } = props
    const { chatId, users } = props.route.params;
    const [messages, setMessages] = useState([])
    useEffect(() => {
        return firestore()
            .doc(`messages/${chatId}`)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.data()?.messages ?? []);
            }
            )
    }, [chatId])
    const onSend = (m = []) => {
        firestore()
            .doc(`messages/${chatId}`)
            .set({
                messages: GiftedChat.append(messages, m),
            }, { merge: true })
    }
    return (
        <>
            <View style={styles.container} >
                <GiftedChat
                    messages={messages.map(x => ({
                        ...x,
                        createdAt: x.createdAt?.toDate()
                    }))}
                    onSend={onSend}
                    user={{
                        _id: auth().currentUser.uid,
                        name: users?.firstName,
                        avatar: users?.image,
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
                                {...props}
                                style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 4 }}>
                                <Image source={Plus} />
                            </TouchableOpacity>
                            <TextInput
                                {...props}
                                value={props.text}
                                placeholder='Type a message'
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
                                style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 4 }}>
                                <Image
                                    source={SendM}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                // renderComposer={(composerProps) => (
                //     <Composer
                //         {...composerProps}
                //         textInputStyle={{
                //             color: '#F7F7FC',
                //             backgroundColor: '#152033',
                //             borderRadius: 4,
                //             gap: 10,
                //             paddingVertical: 6,
                //             paddingHorizontal: 8,
                //         }}
                //     />
                // )}
                />
            </View >
        </>
    )
}
export default Chat
