import React, { useState, useEffect } from 'react'
import { styles } from '../../Assets/Styles/Pages/splashStyle'
import { View, Image, Text } from 'react-native'
import splash from '../../Assets/Images/splash.png'
import { useDispatch } from 'react-redux'
import { save } from '../../Redux/Slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = (props) => {
    const { navigation } = props
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const user_val = await AsyncStorage.getItem('USER');
            if (user_val != null) {
                const user = JSON.parse(user_val);
                dispatch(save(user));
                setTimeout(() => {
                    navigation.navigate('Contacts');
                }, 3000);
            }
            else {
                setTimeout(() => {
                    navigation.navigate('Login')
                }, 3000);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.imgArea}>
                <Image source={splash} alt='splash' style={styles.img} />
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text}>Connect easily with your family and friends over countries</Text>
            </View>
        </View >
    )
}
export default Splash
