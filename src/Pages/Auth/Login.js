import React, { useEffect, useState } from 'react'
import { View, Alert } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import { styles } from '../../Assets/Styles/Pages/loginStyle'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { save, authCheck } from '../../Redux/Slices/authSlice'


const Login = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const login = async () => {
        try {
            if (email && password) {
                await auth().signInWithEmailAndPassword(email, password);
                const UID = auth().currentUser.uid;
                await AsyncStorage.setItem('USER', JSON.stringify({ email, password }));
                dispatch(authCheck(true));
                dispatch(save({ email, password, UID }));
                navigation.navigate('Contacts')
                console.log('signed in!');
            }
            else {
                Alert.alert('Error', 'Please fill all inputs')
            }
        }
        catch (e) {
            Alert.alert('Error', e.message)
        }
    }

    const goRegister = () => {
        navigation.navigate('Register')
    }
    return (
        <View style={styles.container}>
            <View style={styles.area}>
                <InputModel placeholder='Name' onChangeText={setEmail} keyboardType={'email-address'} />
                <InputModel placeholder='Password' onChangeText={setPassword} />
                <ButtonModel title='Login' onPress={login} subTitle={'Register'} onPressSub={goRegister} />
            </View>
        </View>
    )
}

export default Login
