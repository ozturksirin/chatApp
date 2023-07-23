import React from 'react'
import { styles } from '../Assets/Styles/Components/buttonModelStyle'
import { TouchableOpacity, Text, View } from 'react-native'
const ButtonModel = (props) => {
    const { title, onPress, subTitle, onPressSub } = props
    return (
        <>
            <TouchableOpacity
                style={styles.btn}
                onPress={onPress}
            >
                <Text style={styles.text}> {title}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressSub}>
                <View style={styles.btnSecond}>
                    <Text style={styles.text}>{subTitle}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default ButtonModel
