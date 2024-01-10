import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { EXPO_PUBLIC_SPOTIFY_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function Spotify1() {
    console.log('printing');
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
            scopes: ['user-read-email', 'playlist-modify-public'],
            // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri({
                scheme: 'myapp',
            }),
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log(code);
        }
    }, [response]);

    return (
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
    );
}
