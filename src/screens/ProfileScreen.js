import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import GradientBackground from '../components/GradientBackground';

const ProfileScreen = () => {
  return (
    <GradientBackground>
      <View style={globalStyles.container}>
        <Text style={globalStyles.subheaderText}>PROFILE PAGE</Text>
        <Text style={globalStyles.subheaderText}>COMING SOON</Text>
      </View>
    </GradientBackground>
  );
};


export default ProfileScreen;
