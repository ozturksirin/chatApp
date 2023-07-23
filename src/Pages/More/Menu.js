import React from 'react'
import { styles } from '../../Assets/Styles/Pages/menuStyle'
import { Image, View, Text } from 'react-native'
import User from '../../Assets/Images/icons/userImg.png'
import MenuItem from '../../Components/MenuItem'
import account from '../../Assets/Images/icons/account.png'
import chats from '../../Assets/Images/icons/chats.png'
import appereance from '../../Assets/Images/icons/appereance.png'
import notification from '../../Assets/Images/icons/notification.png'
import privacy from '../../Assets/Images/icons/privacy.png'
import folder from '../../Assets/Images/icons/folder.png'
import help from '../../Assets/Images/icons/help.png'
import invite from '../../Assets/Images/icons/invite.png'




const Menu = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                <Image source={User} style={styles.user} />
                <View style={styles.textArea}>
                    <Text style={styles.name}>Ozturk Sirin</Text>
                    <Text style={styles.info}>ozturksirininfo@gmail.com</Text>
                </View>
            </View>
            <View>
                <MenuItem image={account} text={'Account'} onPress={null} />
                <MenuItem image={chats} text={'Chats'} onPress={null} />
                <MenuItem image={appereance} text={'Appereance'} onPress={null} />
                <MenuItem image={notification} text={'Notification'} onPress={null} />
                <MenuItem image={privacy} text={'Privacy'} onPress={null} />
                <MenuItem image={folder} text={'Data Usage'} onPress={null} />
                <MenuItem image={help} text={'Help'} onPress={null} />
                <MenuItem image={invite} text={'Invite Your Friends'} onPress={null} />
            </View>
        </View>
    )
}
export default Menu
