import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import EventsScreen from '../screens/EventsScreen';
import PartnersScreen from '../screens/PartnersScreen';
import EnquiryScreen from '../screens/EnquiryScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import SupportScreen from '../screens/SupportScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: true, headerTintColor: '#1e3a8a' }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Services" component={ServicesScreen} />
                <Stack.Screen name="Events" component={EventsScreen} />
                <Stack.Screen name="Partners" component={PartnersScreen} />
                <Stack.Screen name="Enquiry" component={EnquiryScreen} />
                <Stack.Screen name="Calculator" component={CalculatorScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Contact" component={ContactScreen} />
                <Stack.Screen name="Support" component={SupportScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
