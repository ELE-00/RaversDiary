import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles

const OnboardingScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subheaderText}>ONBOARDING</Text>
      <Text style={globalStyles.subheaderText}>COMING SOON</Text>
    </View>
  );
};


export default OnboardingScreen;
