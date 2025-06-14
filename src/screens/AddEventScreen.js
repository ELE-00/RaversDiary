import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import GradientBackground from '../components/GradientBackground';
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext
import { supabase } from '../utils/supabaseClient';  // Import Supabase client


const AddEventScreen = () => {
  const [userId, setUserId] = useState(null); // Store user_id for profile saving
  const{user} = useContext(AuthContext);


    // Fetch user id and Checklist when the component mounts
  useEffect(() => {
    fetchUserID();
  }, []); // This will run only once when the component mounts

  // Fetch user id
  const fetchUserID = async () => {
    try {
      if (user && user.username) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("user_id")
          .eq('username', user.username.toLowerCase())
          .single();

        if (userError) {
          console.error("Error fetching user ID:", userError);
        } else if (userData) {
          setUserId(userData.user_id);  // Store the user_id in state
          console.log('Fetched User ID:', userData.user_id);  // Log user ID to console
        } else {
          console.warn('User not found.');
        }
      } else {
        console.warn('User information is missing.');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };



  return (
    <GradientBackground>
      <SafeAreaView style={globalStyles.MEcontainer}>
        <Text style = {globalStyles.MEheaderText}>ADD EVENT</Text>
        
        {/* Divider */}
        <View style={globalStyles.MEdivider} />

      </SafeAreaView>
    </GradientBackground> 
  );
};


export default AddEventScreen;
