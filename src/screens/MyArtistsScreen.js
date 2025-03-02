import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles

const MyArtistsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subheaderText}>MY ARTIST PAGE</Text>
      <Text style={globalStyles.subheaderText}>COMING SOON</Text>
    </View>
  );
};


export default MyArtistsScreen;
