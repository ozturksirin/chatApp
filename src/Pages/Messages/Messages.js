import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import User from '../../Assets/Images/icons/userImg.png'
import { styles } from '../../Assets/Styles/Pages/messagesStyle'

const Messages = () => {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.userArea}>
                <Image source={User} />
                <View style={{ paddingLeft: 10, flex: 1 }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={styles.name}> Name </Text>
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
}

export default Messages 
