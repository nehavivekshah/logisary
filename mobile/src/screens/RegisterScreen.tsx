import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export default function RegisterScreen({ navigation }: any) {
    const [role, setRole] = useState<'SHIPPER' | 'CARRIER'>('SHIPPER');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');

    const handleRegister = async () => {
        try {
            const payload = {
                email,
                password,
                full_name: fullName,
                phone_number: phone,
                role,
                company_name: role === 'CARRIER' ? company : undefined
            };

            await axios.post(`${API_URL}/auth/register`, payload);
            Alert.alert('Success', 'Account created! Please login.');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.roleContainer}>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'SHIPPER' && styles.roleActive]}
                    onPress={() => setRole('SHIPPER')}
                >
                    <Text style={[styles.roleText, role === 'SHIPPER' && styles.roleTextActive]}>Shipper</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'CARRIER' && styles.roleActive]}
                    onPress={() => setRole('CARRIER')}
                >
                    <Text style={[styles.roleText, role === 'CARRIER' && styles.roleTextActive]}>Carrier</Text>
                </TouchableOpacity>
            </View>

            <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

            {role === 'CARRIER' && (
                <TextInput style={styles.input} placeholder="Company Name" value={company} onChangeText={setCompany} />
            )}

            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    roleContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#f3f4f6', borderRadius: 8, padding: 4 },
    roleButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 6 },
    roleActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 },
    roleText: { color: '#6b7280', fontWeight: '500' },
    roleTextActive: { color: '#000', fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, marginBottom: 15 },
    button: { backgroundColor: '#2563EB', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    link: { marginTop: 20, textAlign: 'center', color: '#2563EB' },
});
