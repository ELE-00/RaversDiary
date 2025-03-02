import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles

const MyEventsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subheaderText}>MY EVENTS PAGE</Text>
      <Text style={globalStyles.subheaderText}>COMING SOON</Text>
    </View>
  );
};


export default MyEventsScreen;
