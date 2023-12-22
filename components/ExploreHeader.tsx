import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Link } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { houseCategories } from '@/constants/StaticData';
import * as Haptics from 'expo-haptics';

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', flexDirection: 'column' },
    actionBar: {
        flexDirection: 'row',
        // height: 80,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
    },
    slidingBar: { backgroundColor: '#fff', flexDirection: 'row' },
    whereToBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        flex: 1,
        gap: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    whereToBoxText: { flexDirection: 'column', alignItems: 'flex-start' },
    whereToBoxTextHeader: { fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
    optionsBtn: {
        marginLeft: 'auto',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.grey,
        // marginLeft: 10,
        padding: 5,
    },
});

interface ExploreHeaderProps {
    categoryIndex: number;
    updateCategoryIndex: (index: number) => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ categoryIndex, updateCategoryIndex }) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.actionBar}>
                <Link href={'/(modals)/bookings'} asChild>
                    <TouchableOpacity style={styles.whereToBox}>
                        <Ionicons name="search" size={24} color="black" />
                        <View style={styles.whereToBoxText}>
                            <Text style={styles.whereToBoxTextHeader}>Where to?</Text>
                            <Text style={{ fontSize: 12, color: '#888' }}>
                                Anywhere · Any week · Add guests
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.optionsBtn} onPress={() => {}}>
                    <Ionicons name={'options-outline'} size={24} />
                </TouchableOpacity>
            </View>
            <ScrollView
                ref={scrollRef}
                horizontal
                style={styles.slidingBar}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                {houseCategories.map((category, index) => {
                    const isActive = categoryIndex === index;
                    return (
                        <TouchableOpacity
                            ref={(el) => {
                                itemsRef.current[index] = el!;
                            }}
                            onPress={() => {
                                const selected = itemsRef.current[index];
                                selected.measure((x) => {
                                    const offset = x - 12;
                                    scrollRef.current?.scrollTo({ x: offset, animated: true });
                                });
                                updateCategoryIndex(index);
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }}
                            activeOpacity={0.8}
                            key={index}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                justifyContent: 'center',
                                borderBottomWidth: 2,
                                borderBottomColor: 'transparent',
                                ...(isActive && {
                                    borderBottomColor: Colors.dark,
                                }),
                                // paddingHorizontal: 10,
                            }}
                        >
                            <MaterialIcons
                                name={category.icon}
                                size={28}
                                color={isActive ? Colors.dark : Colors.grey}
                                style={{ marginBottom: 5 }}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: isActive ? Colors.dark : Colors.grey,
                                    fontWeight: '500',
                                    letterSpacing: 0.3,
                                }}
                            >
                                {category.category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {/* </View> */}
        </SafeAreaView>
    );
};

export default ExploreHeader;
