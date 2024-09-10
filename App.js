import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';  // Ensure this path is correct
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen API


// Keep splash screen visible while fetching resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
        // Load fonts or other assets
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        // Hide the splash screen when everything is loaded
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!fontsLoaded) {
    // Optionally return null or a custom loading component here
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}