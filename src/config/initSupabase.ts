import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { EXPO_PUBLIC_SUPABASE_ANON_KEY, EXPO_PUBLIC_SUPABASE_URL } from '@env';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        return SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key);
    },
};

const url = EXPO_PUBLIC_SUPABASE_URL;
const key = EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(url!, key!, {
    auth: {
        detectSessionInUrl: false,
        storage: ExpoSecureStoreAdapter,
    },
});
