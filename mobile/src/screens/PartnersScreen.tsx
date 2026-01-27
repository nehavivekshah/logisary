import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export default function PartnersScreen() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/public/landing`)
            .then(res => setPartners(res.data.partners || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.iconBox}>
                <Text style={styles.iconText}>P</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Our Partners</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#1e3a8a" />
            ) : (
                <FlatList
                    data={partners}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id || Math.random().toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, flexDirection: 'row', gap: 15, alignItems: 'center' },
    iconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
    iconText: { fontSize: 20, fontWeight: 'bold', color: '#ea580c' },
    content: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
    type: { fontSize: 10, color: '#ea580c', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
    desc: { fontSize: 12, color: '#4b5563' }
});
