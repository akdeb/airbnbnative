import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface BopCardProps {
    data: React.ReactNode;
    onSwipe: () => void;
}

// Define the context type for the gesture handler
interface GestureHandlerContext {
    startX: number;
    [key: string]: any;
}

const BopCard: React.FC<BopCardProps> = ({ data, onSwipe }) => {
    const translateX = useSharedValue(0);
    const rotate = useSharedValue('0deg');

    const panGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        GestureHandlerContext
    >({
        onStart: (_, context) => {
            context.startX = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX;
            rotate.value = `${translateX.value / 10}deg`;
        },
        onEnd: () => {
            if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
                onSwipe();
                translateX.value = withSpring(translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH);
            } else {
                translateX.value = withSpring(0);
                rotate.value = withSpring('0deg');
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { rotate: rotate.value }],
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.card, animatedStyle]}>{data}</Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    card: {
        // width: SCREEN_WIDTH - 40,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    // ... other styles
});

export default BopCard;
