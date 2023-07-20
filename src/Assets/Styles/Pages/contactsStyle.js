
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#152033', flex: 1, padding: 6
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
});