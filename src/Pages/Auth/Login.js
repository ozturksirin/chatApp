import React, { useEffect, useState } from 'react'
import { View, Alert } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import { styles } from '../../Assets/Styles/Pages/loginStyle'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../../Redux/Slices/authSlice'


const Login = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const login = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Chat')
            console.log('signed in!');
            await AsyncStorage.setItem('USER', JSON.stringify({ email, password }));

        } catch (e) {
            Alert.alert('Error', e.message)
        }
    }
    const getUser = async () => {
        try {
            const user_val = await AsyncStorage.getItem('USER');
            if (user_val != null) {
                const user = JSON.parse(user_val);
                dispatch(save(user));
                navigation.navigate('Chat');
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.area}>
                <InputModel placeholder='Name' onChangeText={setEmail} keyboardType={'email-address'} />
                <InputModel placeholder='Password' onChangeText={setPassword} />

                <ButtonModel title='Login' onPress={login} />
            </View>

        </View>
    )
}

export default Login
