import { View, Button } from 'react-native';
import { Link, router } from 'expo-router';
import React from 'react';
import Colors from '@/constants/Colors';

const ProfileLogin = () => {
    return (
        <View>
            <Link href={'/(modals)/login'}>
                <Button
                    title="Login"
                    onPress={() => router.push('/(modals)/login')}
                    color={Colors.dark}
                />
            </Link>
        </View>
    );
};

export default ProfileLogin;
