import { useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const InternetCheck = () => {
    useEffect(() => {
        const checkInternetConnection = async () => {
            const state = await NetInfo.fetch();
            if (!state.isConnected) {
                Alert.alert(
                    'No Internet Connection',
                    'Please check your internet connection and try again.',
                    [{ text: 'Okey', onPress: () => null }]
                );
            }
        };
        checkInternetConnection();
    }, []);
}


export default InternetCheck;