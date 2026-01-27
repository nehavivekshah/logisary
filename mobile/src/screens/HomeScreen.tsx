import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export default function HomeScreen({ route, navigation }: any) {
    const { token, user } = route.params || {};
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${API_URL}/jobs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setJobs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const placeBid = async (jobId: string) => {
        if (user.role !== 'CARRIER') {
            Alert.alert('Restricted', 'Only Carriers can place bids.');
            return;
        }

        Alert.prompt('Place Bid', 'Enter amount', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Submit',
                onPress: async (amount) => {
                    if (!amount) return;
                    try {
                        await axios.post(`${API_URL}/jobs/${jobId}/bids`,
                            { amount: parseFloat(amount), estimated_delivery_time: '2 days' },
                            { headers: { Authorization: `Bearer ${token}` } });
                        Alert.alert('Success', 'Bid placed successfully');
                    } catch (error: any) {
                        Alert.alert('Error', error.response?.data?.message || 'Failed to bid');
                    }
                }
            }
        ]);
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.origin}>{item.origin}</Text>
                <Text style={styles.arrow}>→</Text>
                <Text style={styles.dest}>{item.destination}</Text>
            </View>
            <Text style={styles.details}>{item.material_type} • {item.weight_volume}</Text>
            <Text style={styles.date}>{new Date(item.scheduled_date).toDateString()}</Text>

            {user.role === 'CARRIER' && (
                <TouchableOpacity style={styles.bidButton} onPress={() => placeBid(item.id)}>
                    <Text style={styles.bidButtonText}>Place Bid</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>Hello, {user?.full_name}</Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View style={{ height: 100, marginBottom: 10 }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={[
                        { name: 'Services', route: 'Services', color: '#eff6ff', text: '#1d4ed8' },
                        { name: 'Events', route: 'Events', color: '#fef2f2', text: '#b91c1c' },
                        { name: 'Partners', route: 'Partners', color: '#fff7ed', text: '#c2410c' },
                        { name: 'Enquiry', route: 'Enquiry', color: '#f0fdf4', text: '#15803d' },
                        { name: 'Calculator', route: 'Calculator', color: '#faf5ff', text: '#7e22ce' },
                        { name: 'About', route: 'About', color: '#f3f4f6', text: '#374151' },
                        { name: 'Contact', route: 'Contact', color: '#eef2ff', text: '#4338ca' },
                    ]}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: item.color }]}
                            onPress={() => navigation.navigate(item.route)}
                        >
                            <Text style={[styles.actionText, { color: item.text }]}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingRight: 20 }}
                />
            </View>

            <Text style={styles.sectionTitle}>Available Jobs</Text>
            <FlatList
                data={jobs}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
    welcome: { fontSize: 20, fontWeight: 'bold' },
    logout: { color: 'red' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    origin: { fontWeight: 'bold', fontSize: 16 },
    dest: { fontWeight: 'bold', fontSize: 16 },
    arrow: { color: '#888' },
    details: { color: '#666', marginTop: 5 },
    date: { color: '#999', fontSize: 12, marginTop: 5 },
    bidButton: { marginTop: 15, backgroundColor: '#8b5cf6', padding: 10, borderRadius: 8, alignItems: 'center' },
    bidButtonText: { color: '#fff', fontWeight: 'bold' },
    actionButton: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, height: 40, justifyContent: 'center' },
    actionText: { fontWeight: 'bold', fontSize: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginBottom: 10 },
});
