import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/Styles';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import BookingCard from '@/components/BookingCard';
import DatePicker from 'react-native-modern-datepicker';

const Places = [
    {
        name: "I'm flexible",
        imageSrc: require('@/assets/images/world-0.png'),
    },
    {
        name: 'Indonesia',
        imageSrc: require('@/assets/images/world-1.png'),
    },
    {
        name: 'United States',
        imageSrc: require('@/assets/images/world-2.png'),
    },
    {
        name: 'United Kingdom',
        imageSrc: require('@/assets/images/world-3.png'),
    },
    {
        name: 'Middle East',
        imageSrc: require('@/assets/images/world-4.png'),
    },
    {
        name: 'Spain',
        imageSrc: require('@/assets/images/world-5.png'),
    },
];

const Bookings = () => {
    const router = useRouter();
    const [openCard, setOpenCard] = React.useState(0);
    const [selectedPlace, setSelectedPlace] = React.useState<number>(0);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [numberOfGuests, setNumberOfGuests] = React.useState<number>(0);

    const onClearAll = () => {
        setOpenCard(0);
        setSelectedPlace(0);
        setSelectedDate(null);
        setNumberOfGuests(0);
    };

    const updateOpenCard = (index: number) => {
        setOpenCard(index);
    };

    const Where = (
        <View>
            <TextInput
                autoCapitalize="none"
                placeholder="Search destinations"
                style={[defaultStyles.inputField, { marginBottom: 20 }]}
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 20 }}
            >
                {Places.map((place, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            backgroundColor: selectedPlace === index ? Colors.primary : '#fff',
                            padding: 10,
                            borderRadius: 8,
                            marginRight: 10,
                            flexDirection: 'column',
                            gap: 10,
                        }}
                        onPress={() => setSelectedPlace(index)}
                    >
                        <Image
                            source={place.imageSrc}
                            style={{ width: 100, height: 100, borderRadius: 10 }}
                        />
                        <Text style={{ color: selectedPlace === index ? '#fff' : '#000' }}>
                            {place.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const When = (
        <View>
            <DatePicker
                current={new Date().toISOString().substring(0, 10)}
                selected={selectedDate?.toISOString().substring(0, 10)}
                mode="calendar"
                onDateChange={(date) => setSelectedDate(new Date(date))}
                options={{
                    borderColor: 'transparent',
                    mainColor: Colors.primary,
                }}
            />
        </View>
    );

    const Who = (
        <View>
            <Text>Who</Text>
        </View>
    );

    return (
        <BlurView intensity={70} style={styles.container} tint="light">
            <BookingCard
                cardIndex={0}
                isOpen={openCard === 0}
                updateOpenCard={updateOpenCard}
                openCardContent={Where}
                selectedOption={Places[selectedPlace].name}
            />
            <BookingCard
                cardIndex={1}
                isOpen={openCard === 1}
                updateOpenCard={updateOpenCard}
                openCardContent={When}
                selectedOption={selectedDate ? selectedDate.toDateString() : 'Add date'}
            />
            <BookingCard
                cardIndex={2}
                isOpen={openCard === 2}
                updateOpenCard={updateOpenCard}
                openCardContent={Who}
                selectedOption={numberOfGuests ? `${numberOfGuests} guests` : 'Add guests'}
            />
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity onPress={() => onClearAll()}>
                        <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>
                            Clear all
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary,
                            paddingVertical: 15,
                            paddingHorizontal: 30,
                            borderRadius: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="search-outline" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Search</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
    },
});

export default Bookings;
