import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import ProfilePage from '@/components/Profile/ProfilePage';
import ProfileLogin from '@/components/Profile/ProfileLogin';
import { useAuth } from '@/provider/AuthProvider';

const Profile = () => {
    const { signOut, user } = useAuth();

    console.log(user);

    const ProfileHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                {/* <Ionicons name="notifications-outline" size={24} color="black" /> */}
            </View>
        );
    };

    return (
        <SafeAreaView style={defaultStyles.container}>
            {user ? (
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <ProfileHeader />
                    <View style={{ flex: 1, backgroundColor: '#ccc' }}>
                        <ProfilePage />
                    </View>
                </ScrollView>
            ) : (
                <View style={{ flex: 1 }}>
                    <ProfileHeader />
                    <ProfileLogin />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // container: { flex: 1 },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: 'center',
        gap: 14,
        marginBottom: 24,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
});

export default Profile;
