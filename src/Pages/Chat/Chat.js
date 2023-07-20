import React, { useEffect, useState, useCallback } from 'react'
import { styles } from '../../Assets/Styles/Pages/chatStyle'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Plus from '../../Assets/Images/icons/plus.png'
import Send from '../../Assets/Images/icons/send.png'
import messaging from '@react-native-firebase/messaging';
import { GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Chat = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer...',
                createdAt: new Date().getTime(),
                user: {
                    _id: 2,
                    name: 'React Native',
                },
            },
        ])
    }, [])

    const onSend = async (msgArr) => {

    };

    useEffect(() => {
        // const newCollectionRef = firestore().collection("test")
        // newCollectionRef.add({
        //     text: "test",
        //     createdAt: new Date().getTime(),
        // })
    }, [])
    return (
        <View style={styles.container}>

            <View style={{ flex: 10, paddingHorizontal: 6 }}>

                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={{
                        _id: auth?.currentUser?.email,
                        name: auth?.currentUser?.email,
                        // avatar: auth?.currentUser?.photoURL
                    }}
                />

                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ color: '#ADB5BD', fontFamily: 'Lato', fontSize: 11, fontStyle: 'normal', fontWeight: '400', lineHeight: 16 }}>Today</Text>
                </View> */}

                {/* incoming message start */}

                {/* <View style={styles.chatArea} >
                    <Text style={styles.text}>lorem ipsum dolor sit amet</Text>
                    <Text style={styles.time}>14:29</Text>
                </View> */}

                {/* incoming message end */}

                {/* outgoing message start */}
                {/* <View style={[styles.chatArea, { alignSelf: 'flex-end', backgroundColor: '#375FFF' }]} >
                    <Text style={styles.text}>lorem ipsum dolor sit amet</Text>
                    <Text style={styles.time}>14:29</Text>
                </View> */}
            </View>
            {/* <View style={styles.inputArea}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 4 }}>
                    <Image source={Plus} />
                </TouchableOpacity>

                <TextInput placeholder='Type a message'
                    placeholderTextColor={'#F7F7FC'}
                    style={styles.input}
                />

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 4 }}>
                    <Image
                        source={Send}
                        style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
            </View> */}
        </View>
    )
}
export default Chat
