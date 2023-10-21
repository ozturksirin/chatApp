
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F1828', flex: 1, padding: 6
    },
    area: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    userArea: {
        flexDirection: 'row'
    },
    name: {
        color: '#F7F7FC',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
    },
    status: {
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
        width: 52,
        height: 52,
        borderRadius: 8
    },
    modalBigImg: {
        width: 300,
        height: 300,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 16
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        backgroundColor: '#1e1e1e',
        borderRadius: 20,
        padding: 24,
    },
    modalText: {
        color: '#FFFFFF',
        fontFamily: 'Mulish',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 16,
    },
    closeBtn: {
        color: '#FFFFFF',
        fontFamily: 'Mulish',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        backgroundColor: '#375FFF',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: 100
    },
    btnText: {
        color: '#FFFFFF',
        fontFamily: 'Mulish',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',

    },
});