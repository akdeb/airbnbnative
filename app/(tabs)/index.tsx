import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
// import listingsGeoData from '@/assets/data/airbnb-geo.json';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import CardStack from '@/components/BopStack/CardStack';

const Index = () => {
    const [categoryIndex, setCategoryIndex] = React.useState(0);

    const updateCategoryIndex = (index: number) => {
        setCategoryIndex(index);
    };

    return (
        <View style={{ flex: 1, marginTop: -20 }}>
            <CardStack />
        </View>
    );
};

export default Index;
