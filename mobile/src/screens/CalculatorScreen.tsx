import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CalculatorScreen() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [distance, setDistance] = useState<number | null>(null);

    const calculate = () => {
        if (!from || !to) {
            Alert.alert('Error', 'Please enter both locations');
            return;
        }
        // Mock
        setDistance(Math.floor(Math.random() * 1000) + 50);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>KM Calculator</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Origin City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mumbai"
                    value={from}
                    onChangeText={setFrom}
                />

                <Text style={styles.label}>Destination City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Delhi"
                    value={to}
                    onChangeText={setTo}
                />

                <TouchableOpacity style={styles.button} onPress={calculate}>
                    <Text style={styles.buttonText}>Calculate Distance</Text>
                </TouchableOpacity>

                {distance !== null && (
                    <View style={styles.resultBox}>
                        <Text style={styles.resultLabel}>ESTIMATED DISTANCE</Text>
                        <Text style={styles.resultValue}>{distance} KM</Text>
                        <Text style={styles.resultNote}>* Approximate driving distance</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8 },
    input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
    button: { backgroundColor: '#1e3a8a', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    resultBox: { marginTop: 30, alignItems: 'center', backgroundColor: '#eff6ff', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#dbeafe' },
    resultLabel: { fontSize: 12, color: '#6b7280', fontWeight: 'bold', letterSpacing: 1, marginBottom: 5 },
    resultValue: { fontSize: 32, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 5 },
    resultNote: { fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }
});
