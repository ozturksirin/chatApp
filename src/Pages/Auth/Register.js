import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import { styles } from '../../Assets/Styles/Pages/registerStyle'
import auth from '@react-native-firebase/auth'



const Register = (props) => {
    const { navigation } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const goLogin = () => {
        navigation.navigate('Login')
    }

    const register = async () => {
        if (email && password && passwordAgain) {
            if (password === passwordAgain) {
                try {
                    const response = await auth().createUserWithEmailAndPassword(email, password);
                    console.log('response', response);
                    navigation.navigate('ProfileCreate');
                }
                catch (error) {
                    console.log('error', error);
                }
            }
            else {
                alert('Passwords are not the same');
            }
        }
        else {
            alert('Please fill all inputs');
        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.inputArea}>
                <InputModel placeholder='E-mail*' keyboardType={'email-address'} onChangeText={setEmail} />
                <InputModel placeholder='Password*' onChangeText={setPassword} />
                <InputModel placeholder='Password again*' onChangeText={setPasswordAgain} />
                <ButtonModel title='Register' onPress={register} subTitle={'Login'} onPressSub={goLogin} />
            </View>
        </View>
    )
}

export default Register
