import React, { useEffect, useState } from 'react'
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
import logout from '../../Assets/Images/icons/logout.png'
import { useDispatch, useSelector } from 'react-redux'
import { save, authCheck } from '../../Redux/Slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Menu = (props) => {
    const { navigation } = props
    const [info, setInfo] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const UID = auth().currentUser.uid;
    useEffect(() => {
        console.log('user', user);
    }, []);
    const logOut = async () => {
        try {
            auth().signOut();
            AsyncStorage.removeItem('USER');
            dispatch(save(null));
            dispatch(authCheck(false));
            if (!user) {
                navigation.navigate('Login');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const goToMessages = () => {
        navigation.navigate('Messages');
    }

    const getProfile = async () => {
        const userRef = firestore().collection('users').where('authUserId', '==', UID);
        const doc = await userRef.get();
        const data = doc.docs[0].data();
        setInfo(data);
    }

    useEffect(() => {
        getProfile();
        // console.log('info', info);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={
                        info?.image ? { uri: info?.image } : User
                    } style={styles.user} />
                    <View style={styles.textArea}>
                        <Text style={styles.name}>{info?.firstName ? info.firstName : 'empty'} {info?.lastName ? info.lastName : 'empty'}</Text>
                        <Text style={styles.info}>{user?.email}</Text>
                    </View>
                </View>
                <View>
                    <MenuItem image={account} text={'Account'} onPress={null} />
                    <MenuItem image={chats} text={'Chats'} onPress={goToMessages} />
                    <MenuItem image={appereance} text={'Appereance'} onPress={null} />
                    <MenuItem image={notification} text={'Notification'} onPress={null} />
                    <MenuItem image={privacy} text={'Privacy'} onPress={null} />
                    <MenuItem image={folder} text={'Data Usage'} onPress={null} />
                    <MenuItem image={help} text={'Help'} onPress={null} />
                    <MenuItem image={invite} text={'Invite Your Friends'} onPress={null} />
                    <MenuItem image={logout} text={'Log out'} onPress={logOut} />

                </View>
            </View>
        </>
    )
}
export default Menu
