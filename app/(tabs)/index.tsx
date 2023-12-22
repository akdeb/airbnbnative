import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
// import listingsGeoData from '@/assets/data/airbnb-geo.json';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Index = () => {
    const [categoryIndex, setCategoryIndex] = React.useState(0);

    const updateCategoryIndex = (index: number) => {
        setCategoryIndex(index);
    };

    const items = useMemo(() => listingsData as AirbnbListing[], []);

    return (
        <View style={{ flex: 1, marginTop: -20 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader
                            categoryIndex={categoryIndex}
                            updateCategoryIndex={updateCategoryIndex}
                        />
                    ),
                }}
            />
            {/* <Listings
                categoryIndex={categoryIndex}
                listings={items.filter(
                    (_: AirbnbListing, index: number) => index % 7 === categoryIndex
                )}
            /> */}
            <ListingsMap
                // listingsGeoData={(listingsGeoData as { features: AirbnbGeoListing[] }).features}
                listingsGeoData={
                    items.filter(
                        (_: AirbnbListing, index: number) => index % 7 === categoryIndex
                    ) as AirbnbListing[]
                }
            />
            <ListingsBottomSheet
                categoryIndex={categoryIndex}
                listings={items.filter(
                    (_: AirbnbListing, index: number) => index % 7 === categoryIndex
                )}
            />
        </View>
    );
};

export default Index;
