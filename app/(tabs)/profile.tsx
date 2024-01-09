import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import ProfilePage from '@/components/Profile/ProfilePage';
import ProfileLogin from '@/components/Profile/ProfileLogin';

const Profile = () => {
    const { signOut, isSignedIn } = useAuth();
    const { user } = useUser();

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
    const [edit, setEdit] = useState(false);

    const onSaveUser = () => {};

    const onCapturePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.75,
            base64: true,
        });

        if (!result.canceled) {
            const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
            user?.setProfileImage({
                file: base64,
            });
        }
    };

    useEffect(() => {
        if (!user) {
            return;
        }
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setEmail(user?.emailAddresses[0].emailAddress);
    }, [user]);

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            {user && (
                <View style={styles.card}>
                    <TouchableOpacity onPress={onCapturePhoto}>
                        <Image style={styles.image} source={{ uri: user?.imageUrl }} />
                    </TouchableOpacity>
                </View>
            )}
            {!isSignedIn && <ProfilePage />}
            {isSignedIn && <ProfileLogin />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
