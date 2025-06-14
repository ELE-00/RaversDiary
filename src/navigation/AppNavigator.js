import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; //Import for stack-based navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //Import for tab-based navigation
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { Image } from 'react-native'; // Import Image for custom logo

// Screen imports
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Onboarding1Screen from '../screens/Onboarding1Screen';
import Onboarding2Screen from '../screens/Onboarding2Screen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TCPScreen from '../screens/TCPScreen';
import GenreSelectionScreen from '../screens/GenreSelectionScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import AddEventScreen from '../screens/AddEventScreen'; 
import MyArtistsScreen from '../screens/MyArtistsScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import BoomerangScreen from '../screens/BoomerangScreen';

// Import your custom logos
const boomerangLogoGray = require('../assets/images/logogray.png'); // Adjust the path as necessary
const boomerangLogoGreen = require('../assets/images/logo.png'); // Adjust the path as necessary

// Create Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for the main app interface
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'My Events') {
            iconName = focused ? 'calendar' : 'calendar-outline'; // Calendar icon for My Events
          } else if (route.name === 'My Artists') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline'; // Musical notes icon for My Artists
          } else if (route.name === 'Boomerang') {
            // Use custom logo for Boomerang
            const boomerangLogo = focused ? boomerangLogoGreen : boomerangLogoGray; // Use green logo if focused
            return (
              <Image
                source={boomerangLogo} // Display the selected logo
                style={{ width: 50, height: 50 }} // Adjust size as needed
              />
            );
          } else if (route.name === 'Checklist') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline'; // Checkmark icon for Checklist
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'; // Person icon for Profile tab
          }

          return <Icon name={iconName} size={size} color={color} />; // Render the appropriate icon for the tab
        },
        tabBarLabel: () => {
          // Remove label for Boomerang tab (only show the icon)
          return route.name === 'Boomerang' ? '' : undefined;
        },
        headerShown: false, // Disable the header for the bottom tab navigation
        tabBarStyle: { backgroundColor: 'black', borderTopWidth: 1, borderTopColor: '#1A1A1A', height: 90,}, // Customize the tab bar's style
        tabBarActiveTintColor: '#1ce069', // Set color for active tab
        tabBarInactiveTintColor: '#7A7A7A',  // Set color for inactive tabs
      })}
    >
      {/* Define the screens for the Bottom Tab Navigator */}
      <Tab.Screen name="My Events" component={MyEventsScreen} />
      <Tab.Screen name="My Artists" component={MyArtistsScreen} />
      <Tab.Screen name="Boomerang" component={BoomerangScreen} />
      <Tab.Screen name="Checklist" component={ChecklistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Navigator (Stack Navigator)
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding1" component={Onboarding1Screen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TCP" component={TCPScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GenreSelection" component={GenreSelectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ headerShown: false }} />

      {/* Main Tab Navigator for logged-in users */}
      <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator; // Export the AppNavigator component for use in the app
