import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GenreChips = () => {
    const genres = [
        '🎻 classical',
        '🎷 jazz',
        '🎸 rock',
        '🎤 pop',
        '🎧 hip-hop/rap',
        '🎛️ edm',
        '🤠 country',
        '💿 r&b/soul',
        '🍃 folk/world',
        '🏝️ reggae/ska',
        '🎵 blues',
        '💃 latin',
        '🤘 metal',
        '🌌 progressive/experimental',
        '🎭 opera/theatre',
        '🇰🇷 k-pop',
        '🎬 soundtracks',
        '🧘 ambient',
        '🎹 piano',
        '🎻 violin',
        '🎷 saxophone',
        '🥁 drum & bass',
        '🎤 vocal',
        '🎸 acoustic',
        '📀 techno',
    ];

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <View style={styles.container}>
            {genres.map((genre, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.chip, selectedGenres.includes(genre) ? styles.chipSelected : {}]}
                    onPress={() => toggleGenre(genre)}
                >
                    <Text
                        style={selectedGenres.includes(genre) ? styles.textSelected : styles.text}
                    >
                        {genre}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    chip: {
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.primary,
        margin: 4,
    },
    chipSelected: {
        backgroundColor: Colors.primary,
    },
    text: {
        color: 'black',
    },
    textSelected: {
        color: 'white',
    },
});

export default GenreChips;
