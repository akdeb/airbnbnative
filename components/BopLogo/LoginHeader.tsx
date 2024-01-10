import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginHeader = () => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="saxophone"
                size={52}
                color="black"
                style={{ transform: [{ rotate: `20deg` }, { scaleX: -1 }] }}
            />
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Bop</Text>
            <Text style={{ fontSize: 16, color: '#888', textAlign: 'center' }}>
                meet people with great music
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
});

export default LoginHeader;
