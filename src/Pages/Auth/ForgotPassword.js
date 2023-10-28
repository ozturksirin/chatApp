import React, { useState } from 'react'
import { styles } from '../../Assets/Styles/Pages/forgotPasswordStyle'
import { Text, View } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import auth from '@react-native-firebase/auth';


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const ResetPassword = async () => {
        try {
            if (!email) {
                console.log('Please fill all inputs');
                setMessage('Please fill all inputs')
            }
            if (email !== '') {
                await auth().sendPasswordResetEmail(email);
                console.log('Password reset email sent successfully');
                setMessage('Password reset email sent successfully')
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <View style={styles.container}>
                <InputModel placeholder='E-mail' keyboardType={'email-address'} onChangeText={setEmail} />
                <ButtonModel title='Reset Password' onPress={ResetPassword} />
                <Text style={styles.text}>{message}</Text>
            </View>
        </>
    )
}

export default ForgotPassword
