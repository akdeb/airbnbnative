import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BopCard from './BopCard'; // Import BopCard component

interface CardData {
    id: number;
    content: string;
}

const mockData: CardData[] = [
    { id: 1, content: '🎻 classical' },
    { id: 2, content: '🎷 jazz' },
    { id: 3, content: '🎸 rock' },
    // ... add more mock data as needed
];

const CardStack: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSwipe = () => {
        // Move to the next card in the stack
        setCurrentIndex((currentIndex + 1) % 3);
        // if (currentIndex < mockData.length - 1) {
        //     setCurrentIndex((currentIndex + 1)%3);
        // }
    };

    return (
        <View style={styles.container}>
            {mockData.map((card, index) => (
                <View key={card.id} style={styles.cardContainer}>
                    {index === currentIndex && (
                        <BopCard data={<Text>{card.content}</Text>} onSwipe={handleSwipe} />
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        position: 'absolute',
    },
});

export default CardStack;
