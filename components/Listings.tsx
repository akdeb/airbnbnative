import {
    View,
    Text,
    ListRenderItem,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React, { useRef } from 'react';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface ListingsProps {
    categoryIndex: number;
    listings: any[];
    // clickRightCategory: boolean;
}

const Listings: React.FC<ListingsProps> = ({ categoryIndex, listings }) => {
    const [loading, setLoading] = React.useState(false);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [categoryIndex]);

    const renderRow: ListRenderItem<AirbnbListing> = ({ item }) => {
        return (
            <Link href={`/listing/${item.id}`} asChild>
                <TouchableOpacity>
                    <Animated.View
                        style={styles.listing}
                        entering={FadeInRight}
                        exiting={FadeInLeft}
                    >
                        <TouchableOpacity style={styles.heartBtn}>
                            <Ionicons
                                name="heart-outline"
                                size={28}
                                color="black"
                                // style={{ fil: '#eee' }}
                            />
                        </TouchableOpacity>
                        <Image style={styles.image} source={{ uri: item.thumbnail_url }} />
                        <View style={styles.listingInfo}>
                            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Ionicons name="star" size={14} color="black" />
                                <Text>{item.review_scores_rating / 20}</Text>
                            </View>
                        </View>
                        <Text style={{ color: '#888' }}>{item.room_type}</Text>
                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <Text style={{ color: Colors.dark, fontWeight: '600' }}>
                                ${item.price}
                            </Text>
                            <Text style={{ color: Colors.dark }}>night</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Link>
        );
    };

    return (
        <View style={defaultStyles.container}>
            <BottomSheetFlatList
                ref={listRef}
                data={loading ? [] : listings}
                renderItem={renderRow}
                keyExtractor={(item) => item.id}
                onEndReachedThreshold={0.5}
                onScrollToIndexFailed={() => {
                    console.log('scroll failed');
                }}
                ListHeaderComponent={
                    <Text
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: '600',
                            marginBottom: 10,
                        }}
                    >
                        {listings.length} homes
                    </Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 15,
        marginBottom: 15,
        gap: 3,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    heartBtn: {
        position: 'absolute',
        right: 25,
        top: 25,
        zIndex: 1,
    },
    listingInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
});

export default Listings;
