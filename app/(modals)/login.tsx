import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import LoginButton from '@/components/LoginButton';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

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

enum Strategy {
    Google = 'oauth_google',
    Facebook = 'oauth_facebook',
    Apple = 'oauth_apple',
}

const Login = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: Strategy.Apple });
    const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: Strategy.Google });
    const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({ strategy: Strategy.Facebook });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Apple]: startAppleOAuthFlow,
            [Strategy.Google]: startGoogleOAuthFlow,
            [Strategy.Facebook]: startFacebookOAuthFlow,
        }[strategy];
        try {
            const { createdSessionId, setActive } = await selectedAuth();
            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
        } catch (err: any) {
            console.log(err);
            if (err.message === 'User closed the popup window') {
                return;
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={[defaultStyles.inputField, { marginBottom: 20 }]}
            />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={styles.separator} />
                <Text style={{ color: '#444' }}>or</Text>
                <View style={styles.separator} />
            </View>
            <LoginButton
                title={'Instagram'}
                onPress={() => {}}
                icon={<Ionicons name="logo-instagram" size={24} />}
            />
            <LoginButton
                title={'Apple'}
                onPress={() => onSelectAuth(Strategy.Apple)}
                icon={<Ionicons name="ios-logo-apple" size={24} />}
            />

            {/* <LoginButton title={"Phone"} onPress={() => {}} icon={<Ionicons name='call-outline' size={24} />} />
      <LoginButton title={"Google"} onPress={() => onSelectAuth(Strategy.Google)} icon={<Ionicons name='ios-logo-google' size={24} />} />
      <LoginButton title={"Facebook"}  onPress={() => onSelectAuth(Strategy.Facebook)} icon={<Ionicons name='ios-logo-facebook' size={24} />} />*/}
        </View>
    );
};

export default Login;
