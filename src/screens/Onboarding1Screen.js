import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Import necessary React Native components
import { globalStyles } from '../utils/theme';  // Import the global styles
import { supabase } from '../utils/supabaseClient';  // Import Supabase client for database operations
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext to get logged-in user data
import { useFocusEffect } from '@react-navigation/native';  // Import the useFocusEffect hook
import GradientBackground from '../components/GradientBackground';

export default function OnboardingScreen1({ route, navigation }) {
  const [raverAlias, setRaverAlias] = useState(''); // Store Raver Alias input
  const [userbio, setUserBio] = useState(''); // Store Bio input
  const [userGenres, setUserGenres] = useState([]); // Store selected genres
  const [userId, setUserId] = useState(null);  // Store user_id for profile saving
  const { user } = useContext(AuthContext);  // Access the logged-in user from context

  // Convert Raver Alias to uppercase (can be used for consistent formatting)
  const UpperCaseraverAlias = raverAlias.toUpperCase();

  // Function to fetch user genres from the database
  const fetchUserGenres = async () => {
    try {
      if (user && user.username) {
        // Fetch the user ID based on the username
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_id')
          .eq('username', user.username.toLowerCase()) // Match username in lowercase
          .single();

        if (!userError && userData) {
          setUserId(userData.user_id);  // Store the user_id in state
        }

        // Fetch user's selected genres from the profile_data table
        const { data: profileData, error: profileError } = await supabase
          .from('profile_data')
          .select('usergenres')
          .eq('user_id', userData.user_id)
          .single();

        if (profileError) {
          console.warn('Error fetching user genres.'); // Warn if there's an error fetching genres
          setUserGenres([]); // Set genres to an empty array if error occurs
        } else if (profileData && profileData.usergenres) {
          // Parse genres if they're stored as a string in the database
          try {
            const parsedGenres = typeof profileData.usergenres === 'string'
              ? JSON.parse(profileData.usergenres)
              : profileData.usergenres;

            if (Array.isArray(parsedGenres)) {
              setUserGenres(parsedGenres); // Update the state with the fetched genres
            } else {
              setUserGenres([]); // If parsing fails, set an empty array
            }
          } catch (parseError) {
            console.error('Error parsing user genres:', parseError);
            setUserGenres([]); // Handle parse error
          }
        } else {
          setUserGenres([]); // Set genres to an empty array if no genres found
        }
      } else {
        console.warn('No user information available.'); // Warn if there's no user data
      }
    } catch (error) {
      console.error('Unexpected error in fetchUserGenres:', error); // Log unexpected errors
    }
  };


  // Function to save profile information (Raver Alias, Bio, and Genres)
  const saveProfileInfo = async () => {
    // Ensure Raver Alias and Genres are not empty
    if (raverAlias.length === 0) {
      Alert.alert('Error', 'Raver Alias is mandatory.');
      return; // Exit if no alias is provided
    }

    // Ensure at least one genre is selected
    if (userGenres.length === 0) {
      Alert.alert('Error', 'Please select at least one genre.');
      return; // Exit if no genres are selected
    }

    try {
      // Save or update the profile data in the database
      const { error } = await supabase
        .from('profile_data')
        .upsert({
          user_id: userId, // User ID for the profile
          raveralias: UpperCaseraverAlias, // Save Raver Alias in uppercase
          bio: userbio, // Save the Bio
        });

      if (error) {
        Alert.alert('Error', 'Failed to save profile info.'); // Show error if save fails
      } else {
        // Navigate to the next onboarding screen on success
        navigation.navigate('Onboarding2');
      }
    } catch (saveError) {
      console.error('Error saving profile info:', saveError); // Log save errors
      Alert.alert('Error', 'Failed to save profile info.'); 
    }
  };


  // Use useFocusEffect to call fetchUserGenres when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserGenres(); // Fetch genres each time the screen is focused
    }, [user]) // Re-fetch genres if user changes
  );

  return (
    <GradientBackground>
      <View style={globalStyles.container}>

        {/* Step Indicator */}
        <Text style={globalStyles.OBstepText}>1 OF 2</Text>

        {/* Welcome Text */}
        <Text style={globalStyles.OBwelcomeText}>WELCOME, RAVER!</Text>

        {/* Description */}
        <Text style={globalStyles.OBdescriptionText}>
          {`We’re excited to have you join our vibrant\ncommunity of music lovers and event-goers.\nLet’s go through a quick onboarding to get you started!`}
        </Text>

  
        {/* Raver Alias Section */}
        <Text style={globalStyles.OBsectionTitle}>1. What's your Raver Alias?</Text>
    
        <TextInput
          style={globalStyles.input}
          placeholder="Raver Alias"
          placeholderTextColor="#aaa"
          value={raverAlias}
          onChangeText={setRaverAlias} 
          selectionColor='#1ce069'
        />  



        {/* Bio Section Section */}
        <Text style={globalStyles.OBsectionTitle}>2. Tell us a bit about yourself.</Text>

        <TextInput
        style={globalStyles.input}
        placeholder="Bio"
        placeholderTextColor="#aaa"
        value={userbio}
        onChangeText={(text) => {
          if (text.length <= 50) {
            setUserBio(text);
          }
        }}
        selectionColor='#1ce069'
        />
        <Text style={{ color: '#aaa', fontSize: 12, margin: -10 }}>{userbio.length}/50</Text>

        {/* Genres Section */}
        <Text style={globalStyles.OBsectionTitle}>3. Tell us what you listen to.</Text>

        {/* Selected Genres Display */}
        <View style={styles.OBselectedContainer}>
          {userGenres.map((genre, index) => (
            <Text key={index} style={styles.OBselectedGenre}>{genre.toUpperCase()}</Text>
          ))}
        </View>

        <TouchableOpacity style={globalStyles.OBgenreButton} onPress={() => navigation.navigate('GenreSelection', { fromPage: 'Onboarding1'})}>
          <Text style={globalStyles.OBgenreButtonText}>Select genres</Text>
        </TouchableOpacity>
  
  
        {/* Divider */}
        <View style={globalStyles.divider} />


        {/* Next Button */}
        <TouchableOpacity style={globalStyles.OBnextButton} onPress={saveProfileInfo}>
          <Text style={globalStyles.OBnextButtonText}>NEXT</Text>
        </TouchableOpacity>

      </View>
    </GradientBackground>  
  );
}

const styles = StyleSheet.create({
  OBselectedText: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
  },
  OBselectedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  OBselectedGenre: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
    fontFamily: 'ChakraPetch-Regular',
  },
});