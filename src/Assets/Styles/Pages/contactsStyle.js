
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F1828', flex: 1, padding: 6
    },
    userArea: {
        flexDirection: 'row', padding: 8
    },
    name: {
        color: '#F7F7FC',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
    },
    lastMessage: {
        color: '#ADB5BD',
        fontFamily: 'Lato',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,
    },
    seperator: {
        borderBottomColor: '#152033',
        borderBottomWidth: 1,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
});