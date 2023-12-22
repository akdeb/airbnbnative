import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const styles = StyleSheet.create({
    card: {
        margin: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        // padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});

const BookingCardList: {
    leftString: string;
    openCardHeading: string;
}[] = [
    {
        leftString: 'Where',
        openCardHeading: 'Where to?',
    },
    {
        leftString: 'When',
        openCardHeading: "When's your trip?",
    },
    {
        leftString: 'Who',
        openCardHeading: "Who's coming?",
    },
];

interface BookingCardProps {
    cardIndex: number;
    isOpen: boolean;
    updateOpenCard: (index: number) => void;
    openCardContent: React.ReactNode;
    selectedOption: string;
}

const BookingCard: React.FC<BookingCardProps> = (props) => {
    const { isOpen, updateOpenCard, cardIndex, openCardContent, selectedOption } = props;
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    const ClosedCard = (
        <AnimatedTouchableOpacity
            onPress={() => updateOpenCard(cardIndex)}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={{ padding: 20 }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', color: Colors.grey }}>
                    {BookingCardList[cardIndex].leftString}
                </Text>
                <Text style={{ fontWeight: 'bold', color: Colors.dark }}>{selectedOption}</Text>
            </View>
        </AnimatedTouchableOpacity>
    );

    return (
        <View style={styles.card}>
            {isOpen ? (
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => updateOpenCard(0)}>
                        <Text style={{ fontWeight: '600', marginBottom: 10, fontSize: 24 }}>
                            {BookingCardList[cardIndex].openCardHeading}
                        </Text>
                    </TouchableOpacity>
                    <View>{openCardContent}</View>
                </View>
            ) : (
                ClosedCard
            )}
        </View>
    );
};

export default BookingCard;
