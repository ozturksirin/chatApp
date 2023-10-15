import React, { useEffect, useState } from 'react'
import { styles } from '../../../Assets/Styles/Pages/accountStyle'
import { View, Image, ScrollView, Text, ActivityIndicator, ToastAndroid, Alert } from 'react-native'
import InputModel from '../../../Components/InputModel'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ButtonModel from '../../../Components/ButtonModel'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const Account = () => {
    const [image, setImage] = useState(null);
    const person = useSelector(state => state.user.user);
    const [info, setInfo] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const UID = auth().currentUser.uid;
    const getProfile = async () => {
        const userRef = firestore().collection('users').where('authUserId', '==', UID);
        const doc = await userRef.get();
        const data = doc.docs[0].data();
        setInfo(data);
    }
    useEffect(() => {
        getProfile();
    }, []);
    // console.log('info', info);
    const createdAt = info?.createdAt?.toDate();

    const update = async () => {
        const userRef = firestore().collection('users').where('authUserId', '==', UID);
        try {
            const userDocs = await userRef.get();
            // If more than one document is returned, you should select the appropriate document here.
            // For example, we select the first document.
            const userDoc = userDocs.docs[0];
            if (userDoc) {
                await userDoc.ref.update({
                    firstName: firstName.split(' ')[0],
                    lastName: lastName.split(' ')[0],
                    image: image,
                });
                // console.log('User updated successfully!');
                ToastAndroid.show('User updated successfully!', ToastAndroid.SHORT);
            }
            else {
                console.error('User not found!');
            }
        }
        catch (error) {
            console.error('Update failed!', error);
            ToastAndroid.show('Update failed!', ToastAndroid.SHORT);
        }
    }

    const openCamera = () => {
        launchCamera({
            selectionLimit: 1,
            mediaType: 'photo'
        },
            (response) => {
                if (!response.didCancel && !response.errorCode) {
                    setImage(response.assets[0].uri);
                }
            });
    };
    const openGallery = () => {
        launchImageLibrary({
            selectionLimit: 1,
            mediaType: 'photo'
        },
            (response) => {
                if (!response.didCancel && !response.errorCode) {
                    setImage(response.assets[0].uri);
                }
            });
    };
    const openImagePicker = () => {
        Alert.alert(
            'Select Image',
            'Select image from gallery or take a photo',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {
                    text: 'Camera',
                    onPress: openCamera,
                },
                {
                    text: 'Gallery',
                    onPress: openGallery,
                },
            ],
            {
                cancelable: true,
            },
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flex: 1, }}>
                    <TouchableOpacity onPress={null}>
                        {
                            info?.image ? <Image style={styles.image} source={{ uri: info?.image }} /> :
                                <ActivityIndicator size='large' color='#FFFFFF' />
                        }
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 3 }}>
                    <InputModel placeholder={info?.firstName}
                        onChangeText={setFirstName}
                    />
                    <InputModel placeholder={info?.lastName}
                        onChangeText={setLastName}
                    />
                    {/* <InputModel placeholder={person?.email} />
                    <InputModel placeholder={person?.password} /> */}
                    <ButtonModel title='Edit' onPress={
                        () => {
                            update();
                        }
                    } />
                    {/* <Text style={styles.date}>CreatedAt:{Date(createdAt)}</Text> */}
                </View>
            </ScrollView>
        </View>
    )
}

export default Account
