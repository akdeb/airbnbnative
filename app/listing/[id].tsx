import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, Share } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import listingsData from '@/assets/data/airbnb-listings.json';
import Animated, {
    FadeInDown,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing: AirbnbListing = (listingsData as AirbnbListing[]).find((l) => l.id === id)!;
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    const navigation = useNavigation();
    const shareListing = async () => {
        try {
            Share.share({
                message: `Check out this listing: ${listing.name}`,
                title: 'Check out this listing',
                url: listing.listing_url,
            });
        } catch (error) {
            alert((error as { message: string }).message);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => {
                return <Animated.View style={[headerAnimatedStyle, styles.header]} />;
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={defaultStyles.roundButton}
                    >
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>
                );
            },
            headerRight: () => {
                return (
                    <View style={styles.bar}>
                        <TouchableOpacity
                            onPress={() => {
                                shareListing();
                            }}
                            style={defaultStyles.roundButton}
                        >
                            <Ionicons name="share-outline" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={defaultStyles.roundButton}>
                            <Ionicons name="heart-outline" size={24} />
                        </TouchableOpacity>
                    </View>
                );
            },
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                scrollEventThrottle={16}
            >
                <Animated.Image
                    style={[{ width, height: IMG_HEIGHT }, imageAnimatedStyle]}
                    source={{ uri: listing?.xl_picture_url }}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{listing.name}</Text>
                    <Text style={styles.location}>
                        {listing.room_type} in {listing.smart_location}
                    </Text>
                    <Text style={styles.rooms}>
                        {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{' '}
                        {listing.beds} bed · {listing.bathrooms} bathrooms
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Ionicons name="star" size={16} />
                        <Text style={styles.ratings}>
                            {listing.review_scores_rating / 20} · {listing.number_of_reviews}{' '}
                            reviews
                        </Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>
                                Hosted by {listing.host_name}
                            </Text>
                            <Text>Host since {listing.host_since}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{listing.description}</Text>
                </View>
            </Animated.ScrollView>
            <Animated.View style={defaultStyles.footer} entering={FadeInDown.delay(300)}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                    }}
                >
                    <TouchableOpacity style={styles.footerText}>
                        {/* <View > */}
                        <Text style={styles.footerPrice}>${listing.price}</Text>
                        <Text>night</Text>
                        {/* </View> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary,
                            paddingVertical: 15,
                            paddingHorizontal: 30,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        // fontFamily: 'mon-sb',
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        // fontFamily: 'mon-sb',
    },
    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        // fontFamily: 'mon',
    },
    ratings: {
        fontSize: 16,
        // fontFamily: 'mon-sb',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        // fontFamily: 'mon-sb',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        // marginBottom: 20,
    },
    header: {
        backgroundColor: '#fff',
        height: 120,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
        // paddingBottom: 20,
    },

    description: {
        fontSize: 16,
        marginTop: 10,
        // fontFamily: 'mon',
    },
});

export default Page;
