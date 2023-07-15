import React from 'react'
import { styles } from '../../Assets/Styles/Pages/chatStyle'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Plus from '../../Assets/Images/icons/plus.png'
import Send from '../../Assets/Images/icons/send.png'

const Chat = () => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 10, paddingHorizontal: 6 }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ color: '#ADB5BD', fontFamily: 'Lato', fontSize: 11, fontStyle: 'normal', fontWeight: '400', lineHeight: 16 }}>Today</Text>
                </View>

                {/* incoming message start */}
                <View style={styles.chatArea} >
                    <Text style={styles.text}>lorem ipsum dolor sit amet</Text>
                    <Text style={styles.time}>14:29</Text>
                </View>
                {/* incoming message end */}

                {/* outgoing message start */}
                <View style={[styles.chatArea, { alignSelf: 'flex-end', backgroundColor: '#375FFF' }]} >
                    <Text style={styles.text}>lorem ipsum dolor sit amet</Text>
                    <Text style={styles.time}>14:29</Text>
                </View>
            </View>

            <View style={styles.inputArea}>
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
            </View>
        </View>
    )
}
export default Chat
