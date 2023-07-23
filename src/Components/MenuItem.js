import React from 'react'
import { styles } from '../Assets/Styles/Components/menuItemStyle'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import next from '../Assets/Images/icons/next.png'

const MenuItem = (props) => {
    const { text, image, onPress } = props

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.body}>
                <Image source={image} style={styles.imgIcon} />
                <Text style={styles.text}>{text}</Text>
                <View style={styles.okArea}>
                    <Image source={next} style={styles.ok} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MenuItem
