import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdffff',
        // padding: 26
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ABABAB',
        fontSize: 16,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: Colors.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
    },
    btnIcon: {
        position: 'absolute',
        left: 10,
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopColor: '#ABABAB',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },
});
