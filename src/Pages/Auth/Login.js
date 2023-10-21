import React, { useState } from 'react'
import { View, Alert, ActivityIndicator } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import { styles } from '../../Assets/Styles/Pages/loginStyle'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { save, authCheck } from '../../Redux/Slices/authSlice'


const Login = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const Login = async () => {
        setIsLoading(true);
        try {
            if (email && password) {
                await auth().signInWithEmailAndPassword(email, password);
                const UID = auth().currentUser.uid;
                await AsyncStorage.setItem('USER', JSON.stringify({ email, password }));
                dispatch(authCheck(true));
                dispatch(save({ email, password, UID }));
                navigation.navigate('Matchs')
                // console.log('signed in!');
                setIsLoading(false);
            }
            else {
                Alert.alert('Error', 'Please fill all inputs')
            }
        }
        catch (e) {
            Alert.alert('Error', e.message)
        }
        finally {
            setIsLoading(false);
        }
    }
    const GoRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            <View style={styles.area}>
                <InputModel placeholder='E-mail' onChangeText={setEmail} keyboardType={'email-address'} />
                <InputModel placeholder='Password' onChangeText={setPassword} secureTextEntry={true} />
                <ButtonModel
                    title={isLoading ? <ActivityIndicator size={'small'} color={'#FFF'} /> : 'Login'}
                    onPress={Login} subTitle={isLoading ? null : 'Register'} onPressSub={GoRegister}
                />
            </View>
        </View>
    )
}

export default Login
