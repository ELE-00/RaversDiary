import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles

const ProfileScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subheaderText}>PROFILE PAGE</Text>
      <Text style={globalStyles.subheaderText}>COMING SOON</Text>
    </View>
  );
};


export default ProfileScreen;
