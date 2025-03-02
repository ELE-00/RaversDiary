import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import the Bottom Tab Navigator
import { NavigationContainer } from '@react-navigation/native'; // Import the Navigation Container for wrapping the app
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons for tab icons

// Import your screen components
import MyEventsScreen from './screens/MyEventsScreen'; // Screen for events
import MyArtistsScreen from './screens/MyArtistsScreen'; // Screen for artists
import BoomerangScreen from './screens/BoomerangScreen'; // Screen for Boomerang
import ChecklistScreen from './screens/ChecklistScreen'; // Screen for checklist
import ProfileScreen from './screens/ProfileScreen'; // Screen for user profile

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="MyEvents" // Set the initial tab route
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'MyEvents') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'MyArtists') {
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            } else if (route.name === 'Boomerang') {
              iconName = focused ? 'infinite' : 'infinite-outline';
            } else if (route.name === 'Checklist') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Return Ionicons component with the appropriate icon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Set active and inactive tint colors for the tab icons
          tabBarActiveTintColor: '#42a5f5',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* Define the screens that will be shown in the tab navigator */}
        <Tab.Screen name="MyEvents" component={MyEventsScreen} />
        <Tab.Screen name="MyArtists" component={MyArtistsScreen} />
        <Tab.Screen name="Boomerang" component={BoomerangScreen} />
        <Tab.Screen name="Checklist" component={ChecklistScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
