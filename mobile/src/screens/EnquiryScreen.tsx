import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function EnquiryScreen({ navigation }: any) {
    const [form, setForm] = useState({ company: '', contact: '', phone: '', origin: '', dest: '', req: '' });

    const submit = () => {
        Alert.alert('Success', 'Enquiry Submitted Successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.header}>Post Enquiry</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Company Name</Text>
                <TextInput style={styles.input} value={form.company} onChangeText={t => setForm({ ...form, company: t })} />

                <Text style={styles.label}>Contact Person</Text>
                <TextInput style={styles.input} value={form.contact} onChangeText={t => setForm({ ...form, contact: t })} />

                <Text style={styles.label}>Phone / Mobile</Text>
                <TextInput style={styles.input} keyboardType="phone-pad" value={form.phone} onChangeText={t => setForm({ ...form, phone: t })} />

                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Origin</Text>
                        <TextInput style={styles.input} value={form.origin} onChangeText={t => setForm({ ...form, origin: t })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Destination</Text>
                        <TextInput style={styles.input} value={form.dest} onChangeText={t => setForm({ ...form, dest: t })} />
                    </View>
                </View>

                <Text style={styles.label}>Requirements</Text>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    multiline
                    placeholder="Describe load details..."
                    value={form.req} onChangeText={t => setForm({ ...form, req: t })}
                />

                <TouchableOpacity style={styles.button} onPress={submit}>
                    <Text style={styles.buttonText}>Submit Enquiry</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8 },
    input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
    button: { backgroundColor: '#1e3a8a', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
