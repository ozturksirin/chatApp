import React, { useEffect, useState } from 'react'
import { styles } from '../../Assets/Styles/Pages/contactsStyle'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import User from '../../Assets/Images/icons/userImg.png'
import firestore from '@react-native-firebase/firestore'

const Contacts = (props) => {
    const { navigation } = props
    const [users, setUsers] = useState([])

    const getUser = async () => {
        const userRef = firestore().collection('users');
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

    const goToChat = () => {
        navigation.navigate('Chat')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    users.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity style={styles.userArea} onPress={
                                    () => {
                                        navigation.navigate('Chat', { user: item.authUserId, })
                                        console.log('authUserId', item.authUserId);
                                    }
                                }>
                                    <Image source={
                                        item.image ? { uri: item.image } : User
                                    } style={styles.userImg} />
                                    <View style={{ paddingLeft: 10, flex: 1 }}>
                                        <Text style={styles.name}>
                                            {item?.firstName + ' ' + item?.lastName}
                                        </Text>
                                        <Text style={styles.lastMessage}>
                                            {item?.lastName + '\'s last message'}
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
    )
}

export default Contacts
