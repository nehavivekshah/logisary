import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header / Hero */}
                <View style={styles.heroSection}>
                    <Text style={styles.logo}>LOGISARY</Text>
                    <Text style={styles.tagline}>Bulk Liquid Transportation</Text>

                    <View style={styles.illustrationContainer}>
                        {/* Placeholder for illustration */}
                        <View style={styles.illustrationPlaceholder}>
                            <Text style={styles.illustrationText}>🚚 🚢</Text>
                        </View>
                    </View>

                    <Text style={styles.mainHeading}>Your Trusted Partner In Logistics</Text>
                    <Text style={styles.subHeading}>
                        Seamlessly connect with trusted carriers and optimize your supply chain.
                    </Text>
                </View>

                {/* Services / Info Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Services</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceScroll}>
                        <View style={styles.card}>
                            <Text style={styles.cardIcon}>📦</Text>
                            <Text style={styles.cardTitle}>Liquid Transport</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardIcon}>🏗️</Text>
                            <Text style={styles.cardTitle}>Dry Bulk</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardIcon}>🏭</Text>
                            <Text style={styles.cardTitle}>Warehousing</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.primaryButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.secondaryButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { flexGrow: 1, paddingBottom: 40 },
    heroSection: { padding: 24, alignItems: 'center' },
    logo: { fontSize: 24, fontWeight: '900', color: '#1E3A8A', letterSpacing: 1, marginBottom: 4 },
    tagline: { fontSize: 12, color: '#64748B', uppercase: 'uppercase', letterSpacing: 1.5, marginBottom: 30 },

    illustrationContainer: { marginVertical: 20, alignItems: 'center' },
    illustrationPlaceholder: { width: 200, height: 150, backgroundColor: '#EFF6FF', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    illustrationText: { fontSize: 50 },

    mainHeading: { fontSize: 28, fontWeight: '800', textAlign: 'center', color: '#1E293B', marginTop: 20, lineHeight: 36 },
    subHeading: { fontSize: 16, textAlign: 'center', color: '#64748B', marginTop: 12, lineHeight: 24, paddingHorizontal: 10 },

    section: { paddingVertical: 20, paddingLeft: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
    serviceScroll: { flexDirection: 'row' },
    card: { width: 140, height: 140, backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, marginRight: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
    cardIcon: { fontSize: 32, marginBottom: 12 },
    cardTitle: { fontSize: 14, fontWeight: '600', color: '#334155' },

    actionContainer: { padding: 24, marginTop: 10 },
    primaryButton: { backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12, shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    secondaryButton: { backgroundColor: '#fff', paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
    secondaryButtonText: { color: '#1E293B', fontSize: 16, fontWeight: '600' },
});
