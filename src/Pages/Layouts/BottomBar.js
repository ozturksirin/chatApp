import React from 'react'
import { styles } from '../../Assets/Styles/Pages/bottomBarStyle'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import more from '../../Assets/Images/icons/more.png'
import accountTab from '../../Assets/Images/icons/accountTab.png'
import messages from '../../Assets/Images/icons/chats.png'

import { useNavigation } from '@react-navigation/native';


const BottomBar = (props) => {
    const navigation = useNavigation();

    const goToContacts = () => {
        navigation.navigate('Matchs')
    }

    const goToMessages = () => {
        navigation.navigate('Messages')
    }

    const goToMore = () => {
        navigation.navigate('Menu')
    }
    return (
        <>
            <View
                style={styles.container}
            >
                <View style={styles.btnArea}>
                    <TouchableOpacity onPress={goToContacts}>
                        <Image source={accountTab} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToMessages}>
                        <Image source={messages} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToMore}>
                        <Image source={more} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export default BottomBar;
