import { supabase } from '@/src/config/initSupabase';
import { Session, User } from '@supabase/supabase-js';
import React, { PropsWithChildren, useEffect } from 'react';
import { createContext } from 'react';

type AuthProps = {
    user: User | null;
    session: Session | null;
    initialized: boolean;
    signOut?: () => void;
};

export const AuthContext = createContext<Partial<AuthProps>>({
    user: null,
    session: null,
    initialized: false,
});

export function useAuth() {
    const auth = React.useContext(AuthContext);
    if (!auth) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return auth;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = React.useState<Session | null>(null);
    const [user, setUser] = React.useState<User | null>(null);
    const [initialized, setInitialized] = React.useState<boolean>(false);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setInitialized(true);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const value = {
        session,
        user,
        initialized,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
