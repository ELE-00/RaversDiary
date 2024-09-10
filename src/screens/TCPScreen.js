import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles

const TCPScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subheaderText}>TERMS AND CONDITIONS</Text>
      <Text style={globalStyles.subheaderText}>COMING SOON</Text>
      <Text style={globalStyles.subheaderText}>PRIVACY POLICY</Text>
      <Text style={globalStyles.subheaderText}>COMING SOON</Text>      
    </View>
  );
};


export default TCPScreen;
