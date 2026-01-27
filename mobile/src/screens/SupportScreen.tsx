import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function SupportScreen({ navigation }: any) {
    useEffect(() => {
        // Redirect to Contact
        navigation.replace('Contact');
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#1e3a8a" />
            <Text style={{ marginTop: 10 }}>Redirecting to Support...</Text>
        </View>
    );
}
