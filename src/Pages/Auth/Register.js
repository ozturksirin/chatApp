import React, { useState } from 'react'
import { View, Alert, ActivityIndicator } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import { styles } from '../../Assets/Styles/Pages/registerStyle'
import auth from '@react-native-firebase/auth'



const Register = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const goLogin = () => {
        navigation.navigate('Login')
    }

    const Register = async () => {
        setIsLoading(true);
        if (email && password && passwordAgain) {
            if (password === passwordAgain) {
                try {
                    const response = await auth().createUserWithEmailAndPassword(email, password);
                    console.log('response', response);
                    navigation.navigate('ProfileCreate', { UID: response.user.uid, email, password });
                }
                catch (error) {
                    console.log('error', error);
                }
            }
            if (password.length < 6) {
                Alert.alert('Error', 'Password must be at least 6 characters')
            }
        }
        else {
            Alert.alert('Error', 'Please fill all inputs');
        }
        setIsLoading(false);
    };


    return (
        <View style={styles.container}>
            <View style={styles.inputArea}>
                <InputModel placeholder='E-mail*' keyboardType={'email-address'} onChangeText={setEmail} />
                <InputModel placeholder='Password*' onChangeText={setPassword} secureTextEntry={true} />
                <InputModel placeholder='Password again*' onChangeText={setPasswordAgain} secureTextEntry={true} />
                <ButtonModel title={isLoading ? <ActivityIndicator size={'small'} color={'#FFF'} /> : 'Register'}
                    onPress={Register} subTitle={'Login'} onPressSub={isLoading ? null : goLogin}
                />
            </View>
        </View>
    )
}

export default Register
