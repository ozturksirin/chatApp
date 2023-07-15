import React, { useState } from 'react'
import { View, Alert } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import { styles } from '../../Assets/Styles/Pages/loginStyle'

import auth from '@react-native-firebase/auth';

const Login = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const login = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Chat')
            console.log('signed in!');
        } catch (e) {
            Alert.alert('Error', e.message)
        }
    }


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
