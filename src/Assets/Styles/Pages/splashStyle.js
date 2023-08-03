import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F1828',
        flex: 1,
        padding: 6
    },
    imgArea: {
        flex: 3,
    },
    img: {
        resizeMode: 'contain',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
    },
    textArea: {
        flex: 2,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        lineHeight: 36,
    },

});