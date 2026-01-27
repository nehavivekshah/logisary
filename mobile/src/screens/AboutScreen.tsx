import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>About RK Transport</Text>

            <View style={styles.card}>
                <Text style={styles.text}>
                    RK Transport is a premier logistics platform dedicated to simplifying the complex world of transportation bidding.
                    We specialize in liquid cargo, hazardous chemical transport, and industrial logistics.
                </Text>
                <Text style={[styles.text, { marginTop: 10 }]}>
                    Our mission is to digitize and optimize the supply chain for the Indian market, ensuring safety, compliance, and speed in every transaction.
                </Text>
            </View>

            <Text style={styles.subHeader}>Who We Are</Text>
            <View style={styles.card}>
                <Text style={styles.text}>
                    Trusted by over 100+ shippers and carriers across India. We provide verified carriers, transparent bidding, and 24/7 support.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
    subHeader: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginTop: 10, marginBottom: 10 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 10 },
    text: { fontSize: 16, color: '#4b5563', lineHeight: 24 }
});
