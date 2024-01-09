import { View, Text, StyleSheet, Button, Image } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import GenreChips from './GenreChips';

const ProfilePage = () => {
    const { signOut } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.circle} />
            <Text style={styles.fullName}>Akashdeep Deb</Text>
            <View style={styles.currentSong}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/assets/images/posty.jpg')}
                        style={styles.currentSongImageStyle}
                    />
                </View>
                <View style={styles.songContainer}>
                    <Text style={styles.songName}>Circles</Text>
                    <Text style={styles.songArtist}>Post Malone</Text>
                </View>
                <Entypo
                    name="spotify-with-circle"
                    style={{ marginLeft: 10 }}
                    size={24}
                    color="black"
                />
            </View>
            <GenreChips />
            {/* <Entypo name="controller-play" size={24} color="black" />
            <Text style={{ marginLeft: 8 }}>Current Song</Text> */}
            <Button title="Logout" onPress={() => signOut()} color={Colors.dark} />
        </View>
    );
};

const styles = StyleSheet.create({
    currentSongImageStyle: { width: 60, height: 60, borderRadius: 10 },
    imageContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4, // Increase the vertical offset
        },
        shadowOpacity: 0.2, // Increase the opacity
        shadowRadius: 5, // Increase the blur radius
        elevation: 5, // Increase the elevation for Android
    },
    songName: { fontWeight: 'bold' },
    songArtist: { color: '#888' },
    currentSong: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
        marginTop: 20,
    },
    songContainer: {
        flexDirection: 'column',
        gap: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    circle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'skyblue',
        // Add any additional styling you want for the circle
    },
    fullName: {
        marginTop: 24,
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ProfilePage;
