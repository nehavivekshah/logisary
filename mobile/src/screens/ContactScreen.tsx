import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';

export default function ContactScreen() {
    const openLink = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Error", "Cannot open this link");
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Contact Us</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.text}>123 Logistics Park, Transport Nagar, New Delhi - 110001</Text>

                <Text style={[styles.label, { marginTop: 20 }]}>Phone</Text>
                <TouchableOpacity onPress={() => openLink('tel:+919876543210')}>
                    <Text style={styles.link}>+91 98765 43210</Text>
                </TouchableOpacity>

                <Text style={[styles.label, { marginTop: 20 }]}>Email</Text>
                <TouchableOpacity onPress={() => openLink('mailto:support@rktransport.com')}>
                    <Text style={styles.link}>support@rktransport.com</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.subHeader}>Need Support?</Text>
                <Text style={styles.desc}>Our team is available 24/7 to assist you.</Text>
                <TouchableOpacity style={styles.button} onPress={() => openLink('tel:+911123456789')}>
                    <Text style={styles.buttonText}>Call Support</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 4 },
    text: { fontSize: 16, color: '#4b5563', lineHeight: 24 },
    link: { fontSize: 16, color: '#2563eb', fontWeight: 'bold' },
    subHeader: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 5 },
    desc: { fontSize: 14, color: '#6b7280', marginBottom: 15 },
    button: { backgroundColor: '#1e3a8a', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
