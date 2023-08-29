import React from 'react'
import { styles } from '../../../Assets/Styles/Pages/accountStyle'
import { View, Image, ScrollView } from 'react-native'
import InputModel from '../../../Components/InputModel'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ButtonModel from '../../../Components/ButtonModel'


const Account = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{
                    flex: 1,
                }}>
                    <TouchableOpacity>
                        <Image style={{
                            width: 100,
                            height: 100,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 28,
                        }}
                            source={
                                require('../../../Assets/Images/icons/userImg.png')
                            }
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3 }}>
                    <InputModel placeholder='Name' />
                    <InputModel placeholder='Email' />
                    <InputModel placeholder='Password' />
                    <ButtonModel title='Edit' />
                </View>
            </ScrollView>
        </View>
    )
}

export default Account
