import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import { supabase } from '../utils/supabaseClient';  // Import the Supabase client

export default function OnboardingScreen1({ navigation }) {
  const [raverAlias, setRaverAlias] = useState('');
  const [userbio, setUserBio] = useState('');

  return (
    <View style={globalStyles.container}>

      {/* Step Indicator */}
      <Text style={globalStyles.OBstepText}>2 OF 2</Text>

      {/* Welcome Text */}
      <Text style={globalStyles.OBwelcomeText}>WELCOME, RAVER!</Text>
      <Text style={globalStyles.OBsectionTitle}>Almost Set!</Text>

 
      {/* Profile Pic Section */}
      <Text style={globalStyles.OBsectionTitle}>4. Profile Pic: Show us your best rave look!</Text>



      {/* Divider */}
      <View style={globalStyles.divider} />


      {/* Next Button */}
      <TouchableOpacity style={globalStyles.OBnextButton} onPress={() => navigation.navigate('Onboarding2Screen')}>
        <Text style={globalStyles.OBnextButtonText}>NEXT</Text>
      </TouchableOpacity>

    </View>
  );
}

