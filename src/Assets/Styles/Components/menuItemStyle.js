import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        flexDirection: 'row',
    },
    imgIcon: {
        width: 30,
        height: 30,
    },
    text: {
        color: '#F7F7FC',
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 24,
        justifyContent: 'center',
        textAlignVertical: 'center',
        paddingLeft: 10,
    },
    okArea: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    ok: {
        width: 26,
        height: 26,
    }
});