import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import {
    Feather,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    Octicons,
} from '@expo/vector-icons';

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                // tabBarLabelStyle: {}
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Bop',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="copy-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
