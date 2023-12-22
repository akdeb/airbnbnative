import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface ListingsMapProps {
    listingsGeoData: AirbnbListing[];
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    marker: {
        backgroundColor: '#fff',
        padding: 5,
        paddingHorizontal: 10,
        // fontWeight: 'bold',
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        // elevation: 2,
        // shadowColor: '#000',
        // shadowOpacity: 0.12,
        // shadowRadius: 8,
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
    },
    // map: {
    //     width: '100%',
    //     height: '100%',
    // },
});

const ListingsMap: React.FC<ListingsMapProps> = ({ listingsGeoData }) => {
    const router = useRouter();
    const onMarkerPress = (item: AirbnbListing) => {
        router.push(`/listing/${item.id}`);
    };

    const renderCluster = (cluster: any) => {
        const { id, geometry, properties, onPress } = cluster;
        const points = properties.point_count;
        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{
                    latitude: geometry.coordinates[0],
                    longitude: geometry.coordinates[1],
                }}
                style={styles.marker}
                onPress={onPress}
            >
                <Text style={{ fontWeight: 'bold' }}>{points}</Text>
            </Marker>
        );
    };

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={{
                    latitude: 51.5,
                    longitude: -0.12,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                clusterColor="#fff"
                clusterTextColor="#000"
                // renderCluster={renderCluster}
            >
                {listingsGeoData.map((listing) => {
                    return (
                        <Marker
                            onPress={() => onMarkerPress(listing)}
                            key={listing.id}
                            coordinate={{
                                latitude: +listing.latitude,
                                longitude: +listing.longitude,
                            }}
                        >
                            <View style={styles.marker}>
                                <Text style={{ fontWeight: '600', letterSpacing: 1 }}>
                                    ${listing.price}
                                </Text>
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default ListingsMap;
