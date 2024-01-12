import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore module
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import ModalHeaderText from '@/components/ModalHeaderText';
import { defaultStyles } from '@/constants/Styles';
import { AuthProvider, useAuth } from '@/provider/AuthProvider';
// import { useColorScheme } from 'react-native';

const tokenCache = {
    async getToken(key: string) {
        try {
            return await SecureStore.getItemAsync(key); // Use SecureStore to get item
        } catch (error) {
            console.error('Error getting token from SecureStore:', error);
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value); // Use SecureStore to set item
        } catch (error) {
            console.error('Error setting token in SecureStore:', error);
        }
    },
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
    // const colorScheme = useColorScheme();

    const { session, initialized } = useAuth();
    // const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // if (!initialized) return;
        // const inAuthGroup = segments[0] === '(auth)';
        if (initialized && session) return;
        if (!initialized) {
            router.push('/(modals)/login');
        }
    }, [session, initialized]);

    return (
        // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="(modals)/login"
                options={{
                    presentation: 'modal',
                    title: 'Login or signup',
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    router.push('/');
                                }}
                            >
                                <Ionicons name="close" size={32} />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            {/* <Stack.Screen
                name="listing/[id]"
                options={{ headerTitle: '', headerTransparent: true }}
            /> */}
            <Stack.Screen
                name="(modals)/bookings"
                options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                    headerTransparent: true,
                    headerTitle: () => <ModalHeaderText />,
                    title: 'Bookings',
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    router.back();
                                }}
                                style={defaultStyles.roundButton}
                            >
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
        </Stack>

        // </ThemeProvider>
    );
}

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}
