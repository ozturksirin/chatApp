import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#152033',
        flex: 1,
    },
    chatArea: {
        backgroundColor: '#0F1828',
        borderRadius: 16,
        display: 'flex',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        marginVertical: 4,
        alignSelf: 'flex-start',
    },
    text: {
        color: '#F7F7FC',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
    },
    time: {
        color: '#ADB5BD',
        fontFamily: 'Lato',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
    },

    //message input area start

    inputArea: {
        backgroundColor: '#0F1828',
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    input: {
        color: '#F7F7FC',
        backgroundColor: '#152033',
        borderRadius: 4,
        gap: 10,
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
    },



});