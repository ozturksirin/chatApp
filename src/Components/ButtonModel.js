import React from 'react'
import { styles } from '../Assets/Styles/Components/buttonModelStyle'
import { TouchableOpacity, Text } from 'react-native'
const ButtonModel = (props) => {
    const { title, onPress } = props
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            <Text style={styles.text}> {title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonModel
