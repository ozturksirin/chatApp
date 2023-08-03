import { StyleSheet } from "react-native";

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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    date: {
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 16,
        color: '#EDEDED',
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notificationArea: {
        width: 24,
        height: 24,
        borderRadius: 40,
        backgroundColor: '#D2D5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        color: '#001A83',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 16,
        textAlign: 'center',
    },
});