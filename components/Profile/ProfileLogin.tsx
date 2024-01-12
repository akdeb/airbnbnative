import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import React from 'react';
import Colors from '@/constants/Colors';
import LoginHeader from '../BopLogo/LoginHeader';
import { defaultStyles } from '@/constants/Styles';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 100,
        // backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const ProfileLogin = () => {
    return (
        <View style={styles.container}>
            <LoginHeader fade />
            {/* <Link href={'/(modals)/login'}> */}
            <TouchableOpacity
                style={[defaultStyles.btn, { paddingHorizontal: 20 }]}
                onPress={() => router.push('/(modals)/login')}
                // color={Colors.dark}
            >
                <Text style={defaultStyles.btnText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileLogin;
