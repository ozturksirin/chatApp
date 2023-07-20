import React, { useEffect } from 'react'
import { styles } from '../../Assets/Styles/Pages/contactsStyle'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import User from '../../Assets/Images/icons/userImg.png'
import firestore from '@react-native-firebase/firestore'

const Contacts = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.userArea}>
                <Image source={User} />
                <View style={{ paddingLeft: 10, }}>
                    <Text style={styles.name}>
                        Name
                    </Text>
                    <Text style={styles.lastMessage}>
                        Last Message
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.seperator} />
        </View>
    )
}

export default Contacts
