import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Entypo, FontAwesome5, Fontisto } from '@expo/vector-icons';
import GenreChips from './GenreChips';
import SpotifyButton from './Spotify';
import { useAuth } from '@/provider/AuthProvider';

const SOCIAL_ICON_SIZE = 32;

const ProfilePage = () => {
    const { signOut } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.circle} />
                <Text style={styles.fullName}>Akashdeep Deb</Text>
            </View>
            <SpotifyButton />

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
            <View style={styles.socials}>
                <TouchableOpacity>
                    <Entypo name="instagram" size={SOCIAL_ICON_SIZE} color={'#C13584'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="spotify" size={SOCIAL_ICON_SIZE} color={'#1DB954'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Fontisto name="applemusic" size={SOCIAL_ICON_SIZE} color={'#FF2D55'} />
                </TouchableOpacity>
            </View>
            <GenreChips />
            {/* <Entypo name="controller-play" size={24} color="black" />
            <Text style={{ marginLeft: 8 }}>Current Song</Text> */}
            <Button
                title="Logout"
                onPress={() => {
                    signOut!();
                }}
                color={Colors.dark}
            />
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
    socials: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 20,
        gap: 10,
    },
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
        gap: 15,
    },
    profile: {
        flexDirection: 'column',
        alignItems: 'center',
        // gap: 10,
    },
    circle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#e1a0d7',
        // Add any additional styling you want for the circle
    },
    fullName: {
        marginTop: 24,
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ProfilePage;
