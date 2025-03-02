import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; //Import Navigation Container for app navigation
import AppNavigator from './src/navigation/AppNavigator';  // Import AppNavigator for hangling navigation flow
import * as Font from 'expo-font'; //Import custom fonts
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen API to manage splash screen
import { AuthProvider } from './src/utils/AuthContext';  // Import AuthProvider to provide authentication context to the app
import 'react-native-gesture-handler'; // Import guesture handler for navigtion and gesture support
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Gesture Handler Root View to wrap the entire app for gesture support

// Keep splash screen visible while fetching resources (e.g loading fonts)
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); //State to track if fonts are loaded

  // Function to load custom fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      'microgramma-bold': require('./src/assets/fonts/microgramma-bold.ttf'),
      'Microgramma Normal': require('./src/assets/fonts/Microgramma Normal.ttf'),
      'ChakraPetch-Regular': require('./src/assets/fonts/ChakraPetch-Regular.ttf'),
    });
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        // Try loading fonts or other neccesary assets
        await loadFonts();
      } catch (e) {
        console.warn(e); // Log any errors during loading
      } finally {
        setFontsLoaded(true); //Set fontsLoaded to true when fonts are ready
        // Hide the splash screen after loading is complete
        await SplashScreen.hideAsync();
      }
    };

    prepare(); // Call the prepare function to lead assets
  }, []); //Empty dependency array means this effect runs once when the component mounts

  if (!fontsLoaded) {
    // If fonts are not loaded yet, return null or a loading component
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
