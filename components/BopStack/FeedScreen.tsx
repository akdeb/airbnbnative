import { Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList, FlatListProps } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import VideoPost from './VideoPost';

const dummyPosts = [
    {
        id: '2',
        video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
        caption: 'Caption of the post',
    },
    {
        id: '1',
        video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
        caption: 'Hey there',
    },
    {
        id: '3',
        video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
        caption: 'Hola',
    },
    {
        id: '4',
        video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
        caption: 'Piano practice',
    },
    {
        id: '5',
        video: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
        caption: 'Hello World!',
    },
];

const FeedScreen = () => {
    const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
    const [posts, setPosts] = useState<typeof dummyPosts>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            // fetch posts from the server
            setPosts(dummyPosts);
        };

        fetchPosts();
    }, []);

    const viewabilityConfigCallbackPairs = useRef<any[]>([
        {
            viewabilityConfig: { itemVisiblePercentThreshold: 50 },
            onViewableItemsChanged: ({
                _changed,
                viewableItems,
            }: {
                viewableItems: any[];
                _changed: boolean;
            }) => {
                if (viewableItems.length > 0 && viewableItems[0].isViewable) {
                    setActivePostId(viewableItems[0].item.id);
                }
            },
        },
    ]);

    const onEndReached = () => {
        // fetch more posts from database
        setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.logo}>Your Logo Text</Text>
            </View>
            <FlatList
                data={posts}
                renderItem={({ item }) => <VideoPost post={item} activePostId={activePostId} />}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                pagingEnabled
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 50, // adjust as needed
        zIndex: 1000, // add this line
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        color: 'white',
    },
});

export default FeedScreen;
