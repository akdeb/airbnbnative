import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface ListingsbottomSheetProps {
    categoryIndex: number;
    listings: AirbnbListing[];
}

const ListingsBottomSheet: React.FC<ListingsbottomSheetProps> = ({ categoryIndex, listings }) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const snapPoints = React.useMemo(() => ['10%', '100%'], []);
    const showMap = () => {
        bottomSheetRef.current?.collapse();
    };

    return (
        <BottomSheet
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleIndicatorStyle={{
                backgroundColor: '#eee',
            }}
            enablePanDownToClose={false}
        >
            <Listings categoryIndex={categoryIndex} listings={listings} />
            <View style={styles.absoluteBtn}>
                <TouchableOpacity style={styles.mapBtn} onPress={showMap}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Map</Text>
                    <Ionicons name="map" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    absoluteBtn: {
        // backgroundColor: Colors.,
        // height: 60,
        // width: 60,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        // marginHorizontal: 'auto',
    },
    mapBtn: {
        backgroundColor: Colors.dark,
        color: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
});

export default ListingsBottomSheet;
