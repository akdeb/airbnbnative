import React from 'react';
import { Button, Alert } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET } from '@env';

const spotifyConfig = {
    clientId: 'd12c67ed822343dd80c655534b3a7426',
    clientSecret: EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET,
    redirectUrl: 'https://www.joinvino.club',
    scopes: ['streaming', 'playlist-read-private', 'user-read-email', 'user-read-private'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
};

const SpotifyButton = () => {
    // console.log('hello', spotifyConfig);
    const handleSpotifyLogin = async () => {
        try {
            const authState = await authorize(spotifyConfig);
            console.log(authState);
            // Handle successful authentication here
        } catch (error) {
            console.error(error);
            Alert.alert('Authentication Error', 'Failed to authenticate with Spotify.');
        }
    };

    return <Button title="Connect to Spotify" onPress={handleSpotifyLogin} />;
};

export default SpotifyButton;
