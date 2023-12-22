import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const ModalHeaderText = () => {
    const [isStay, setIsStay] = React.useState(true);

    return (
        <View>
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: isStay ? '#000' : 'transparent',
                    }}
                    onPress={() => setIsStay(true)}
                >
                    <Text style={styles.tab}>Stays</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: !isStay ? '#000' : 'transparent',
                    }}
                    onPress={() => setIsStay(false)}
                >
                    <Text style={styles.tab}>Experiences</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tab: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default ModalHeaderText;
