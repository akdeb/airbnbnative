import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
// import listingsGeoData from '@/assets/data/airbnb-geo.json';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import CardStack from '@/components/BopStack/CardStack';
import FeedScreen from '@/components/BopStack/FeedScreen';

const Index = () => {
    return <FeedScreen />;
};

export default Index;
