import React, { useState, useEffect } from 'react'
import { styles } from '../../Assets/Styles/Pages/profileCreateStyle'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import InputModel from '../../Components/InputModel'
import ButtonModel from '../../Components/ButtonModel'
import uploadImg from '../../Assets/Images/uploadImg.png'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



const ProfileCreate = (props) => {
    const { navigation } = props
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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

    const saveProfile = async () => {
        if (!image) {
            Alert.alert('Error', 'Please select an image');
            return;
        }
        if (!firstName) {
            Alert.alert('Error', 'Please enter first name');
            return;
        }
        if (!lastName) {
            Alert.alert('Error', 'Please enter last name');
            return;
        }

        try {
            const imageUrl = await uploadImage();
            await saveToFirestore(imageUrl);
            Alert.alert(
                'Success',
                'Profile created successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Contacts'),
                    },
                ]
            );
            setFirstName('');
            setLastName('');
            setImage(null);
        }
        catch (error) {
            console.error('Error while saving profile:', error);
            Alert.alert('Error', 'An error occurred while saving the profile.');
        }
    };

    const uploadImage = async () => {
        const reference = storage().ref(`users/${image.split('/').pop()}`);
        const taskSnapshot = await reference.putFile(image);
        const imageUrl = await reference.getDownloadURL();
        console.log('Image uploaded and URL:', imageUrl);
        return imageUrl;
    };

    const saveToFirestore = async (imageUrl) => {
        const newCollectionRef = firestore().collection('users');
        await newCollectionRef.add({
            image: imageUrl,
            firstName: firstName,
            lastName: lastName,
            createdAt: new Date().getTime(),
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.uploadImageArea}>
                <View>
                    <TouchableOpacity onPress={openImagePicker}
                        style={styles.image}
                    >
                        <Image source={uploadImg}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputArea}>
                <InputModel placeholder='First Name (Required)' value={firstName} onChangeText={setFirstName} />
                <InputModel placeholder='Last Name (Required)' value={lastName} onChangeText={setLastName} />
            </View>
            <View style={styles.btnArea}>
                <ButtonModel title='Save' onPress={saveProfile} />
            </View>
        </View>
    )
}

export default ProfileCreate
