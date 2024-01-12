import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

import {
    Feather,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from '@expo/vector-icons';
import { TAB_HEIGHT } from '@/constants/Constants';

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                // tabBarLabelStyle: {}
            }}
            tabBar={(props) => (
                <View style={{ height: TAB_HEIGHT }}>
                    <BottomTabBar {...props} />
                </View>
            )}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Bop',
                    headerTitle: () => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="saxophone"
                                size={28}
                                color="black"
                                style={{ transform: 'rotate(20deg) scaleX(-1)' }}
                            />
                            <Text style={{ fontSize: 24, fontWeight: '400' }}>Bop</Text>
                        </View>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="amp-stories" color={color} size={size} />
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
