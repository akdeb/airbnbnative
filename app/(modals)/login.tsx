import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import LoginButton from '@/components/LoginButton';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/src/config/initSupabase';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import LoginHeader from '@/components/BopLogo/LoginHeader';
import { EXPO_PUBLIC_SPOTIFY_CLIENT_ID } from '@env';
// import * as AppAuth from 'expo-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Spotify1 from '@/components/Profile/Spotify1';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 8,
        backgroundColor: '#fff',
        padding: 26,
    },
    separatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    separator: {
        height: 1,
        width: '45%',
        backgroundColor: '#ccc',
    },
});

const Login = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const navigation = useNavigation();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [continuePressed, setContinuePressed] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>('');

    React.useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem('token');
            const expirationDate = await AsyncStorage.getItem('expirationDate');
            console.log('acess token', accessToken);
            console.log('expiration date', expirationDate);

            if (accessToken && expirationDate) {
                const currentTime = Date.now();
                if (currentTime < parseInt(expirationDate)) {
                    // here the token is still valid
                    router.replace('/(tabs)/');
                } else {
                    // token would be expired so we need to remove it from the async storage
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('expirationDate');
                }
            }
        };

        checkTokenValidity();
    }, []);

    // // Sign in with email and password
    // const onSignInPress = async () => {
    //     setLoading(true);

    //     const { error } = await supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     });

    //     if (error) Alert.alert(error.message);
    //     setLoading(false);
    // };

    // // Create a new user
    // const onSignUpPress = async () => {
    //     setLoading(true);
    //     const { error } = await supabase.auth.signUp({
    //         email: email,
    //         password: password,
    //     });

    //     if (error) Alert.alert(error.message);
    //     setLoading(false);
    // };

    const loginOrSignup = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) setError(error.message);

        if (error) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) setError(error.message);
        }

        setLoading(false);
    };

    const loginWithSpotify = async (): Promise<any> => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'spotify',
            });

            console.log('spotify oauth', data);

            if (error) throw error;

            //   console.log('User info:', user);
            return data;
        } catch (error) {
            console.error('Error logging in with Spotify:', error);
            return null;
        }
    };

    const authenticateWithSpotify = async () => {
        const config = {
            issuer: 'https://accounts.spotify.com/authorize',
            clientId: EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
            scopes: [
                'user-read-email',
                'user-library-read',
                'user-read-recently-played',
                'user-top-read',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public', // or "playlist-modify-private"
            ],
            redirectUrl: 'exp://192.168.1.241:8081/--/spotify-auth-callback',
        };
        // const result = await AppAuth.authAsync(config);
        // console.log(result);

        // if (result.accessToken) {
        //     const expirationDate = new Date(result.accessTokenExpirationDate!).getTime();
        //     AsyncStorage.setItem('token', result.accessToken);
        //     AsyncStorage.setItem('expirationDate', expirationDate.toString());
        //     router.push('/(tabs)/');
        // }
    };

    const continueWithEmail = email && continuePressed;

    return (
        <View style={styles.container}>
            <LoginHeader />
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={[defaultStyles.inputField, { marginBottom: 10 }]}
                value={email}
                onChangeText={setEmail}
            />
            {continueWithEmail && (
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={[defaultStyles.inputField, { marginBottom: 20 }]}
                />
            )}
            {error && <Text>{error}</Text>}
            <TouchableOpacity
                style={defaultStyles.btn}
                onPress={() => {
                    if (!continuePressed) setContinuePressed(true);
                    if (email && password) {
                        loginOrSignup();
                    }
                }}
                disabled={loading}
            >
                <Text style={defaultStyles.btnText}>
                    Continue {continueWithEmail && 'with email'}
                </Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={styles.separator} />
                <Text style={{ color: '#444' }}>or</Text>
                <View style={styles.separator} />
            </View>
            <Spotify1 />

            <LoginButton
                title={'Spotify'}
                onPress={() => {
                    // loginWithSpotify();
                    authenticateWithSpotify();
                }}
                icon={<FontAwesome5 name="spotify" size={24} />}
            />
            <LoginButton
                title={'Google'}
                onPress={() => {}}
                icon={<FontAwesome5 name="google" size={22} color="black" />}
            />
            <LoginButton
                title={'Apple'}
                onPress={() => {}}
                icon={<FontAwesome5 name="apple" size={24} color="black" />}
            />
        </View>
    );
};

export default Login;
