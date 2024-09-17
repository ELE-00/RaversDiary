import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import { supabase } from '../utils/supabaseClient';  // Import the Supabase client
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext
import { useFocusEffect } from '@react-navigation/native';  // Import the useFocusEffect hook


export default function OnboardingScreen1({ route, navigation }) {
  const [raverAlias, setRaverAlias] = useState('');
  const [userbio, setUserBio] = useState('');
  const [userGenres, setUserGenres] = useState([]);
  const { user } = useContext(AuthContext);  // Access the logged-in user

  // Function to fetch user genres
  const fetchUserGenres = async () => {
    try {
      if (user && user.username) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_id')
          .eq('username', user.username.toLowerCase())
          .single();

        if (userError || !userData) {
          console.warn('User data not found.');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profile_data')
          .select('usergenres')
          .eq('user_id', userData.user_id)
          .single();

        if (profileError) {
          console.warn('Error fetching user genres.');
          setUserGenres([]);
        } else if (profileData && profileData.usergenres) {
          try {
            const parsedGenres = typeof profileData.usergenres === 'string'
              ? JSON.parse(profileData.usergenres)
              : profileData.usergenres;

            if (Array.isArray(parsedGenres)) {
              setUserGenres(parsedGenres);
            } else {
              setUserGenres([]);
            }
          } catch (parseError) {
            console.error('Error parsing user genres:', parseError);
            setUserGenres([]);
          }
        } else {
          setUserGenres([]);
        }
      } else {
        console.warn('No user information available.');
      }
    } catch (error) {
      console.error('Unexpected error in fetchUserGenres:', error);
    }
  };

  // Use useFocusEffect to call fetchUserGenres when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserGenres();
    }, [user])
  );

  return (
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
        if (text.length <= 10) {
          setUserBio(text);
        }
      }}
      selectionColor='#1ce069'
      />
      <Text style={{ color: '#aaa', fontSize: 12, margin: -10 }}>{userbio.length}/10</Text>

      {/* Genresn Section */}
      <Text style={globalStyles.OBsectionTitle}>3. Tell us what you listen to.</Text>

      {/* Selected Genres Display */}
      <View style={styles.OBselectedContainer}>
        {userGenres.map((genre, index) => (
          <Text key={index} style={styles.OBselectedGenre}>{genre}</Text>
        ))}
      </View>

      <TouchableOpacity style={globalStyles.OBgenreButton} onPress={() => navigation.navigate('GenreSelection', { fromPage: 'Onboarding1'})}>
        <Text style={globalStyles.OBgenreButtonText}>Select genres</Text>
      </TouchableOpacity>
 
 
      {/* Divider */}
      <View style={globalStyles.divider} />


      {/* Next Button */}
      <TouchableOpacity style={globalStyles.OBnextButton} onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={globalStyles.OBnextButtonText}>NEXT</Text>
      </TouchableOpacity>

    </View>
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