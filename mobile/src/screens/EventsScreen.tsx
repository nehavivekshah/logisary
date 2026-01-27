import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export default function EventsScreen() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/public/landing`)
            .then(res => setEvents(res.data.events || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.dateBox}>
                <Text style={styles.dateDay}>{new Date(item.date).getDate()}</Text>
                <Text style={styles.dateMonth}>{new Date(item.date).toLocaleString('default', { month: 'short' })}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.desc}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upcoming Events</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#1e3a8a" />
            ) : (
                <FlatList
                    data={events}
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
    dateBox: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
    dateDay: { fontSize: 20, fontWeight: 'bold', color: '#1e3a8a' },
    dateMonth: { fontSize: 12, color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' },
    content: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
    location: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
    desc: { fontSize: 12, color: '#4b5563' }
});
