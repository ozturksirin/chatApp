import React from 'react'
import { styles } from '../Assets/Styles/Components/inputModelStyle'
import { View, TextInput } from 'react-native'
const InputModel = (props) => {
    const { placeholder, value, onChangeText, keyboardType } = props
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholderTextColor={'#F7F7FC'}

                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default InputModel
