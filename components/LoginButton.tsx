import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface LoginButtonProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
}

const styles = StyleSheet.create({
    btnOutline: {
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
    icon: {
        position: "absolute",
        left: 20,
    }
});

const LoginButton: React.FC<LoginButtonProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.btnOutline} onPress={onPress}>
        <View style={styles.icon}>{icon}</View> 
      <Text style={styles.btnText}>Continue with {title}</Text>
    </TouchableOpacity>
  )
}

export default LoginButton