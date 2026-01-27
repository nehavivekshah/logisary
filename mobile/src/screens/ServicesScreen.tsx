import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export default function ServicesScreen() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/public/services`)
            .then(res => setServices(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.iconPlaceholder}>
                <Text style={styles.iconText}>{item.title.charAt(0)}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Our Services</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#1e3a8a" />
            ) : (
                <FlatList
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
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
    iconPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
    iconText: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a' },
    content: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#1e3a8a' },
    category: { fontSize: 10, color: '#3b82f6', textTransform: 'uppercase', marginBottom: 4, fontWeight: 'bold' },
    desc: { fontSize: 12, color: '#6b7280' }
});
