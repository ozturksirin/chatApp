import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1828',
        paddingHorizontal: 6,
        paddingVertical: 10,
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 28,
    },
    date: {
        alignSelf: 'center',
        marginTop: 28,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
});