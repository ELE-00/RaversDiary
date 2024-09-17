import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import { Image } from 'expo-image';
import { supabase } from '../utils/supabaseClient';  // Import Supabase
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);  // Access login function from context

  const handleLogin = async () => {
    try {
      const user = await login(username, password);  // Call the login function from context
      
      // Fetch user data from Supabase after login to check the last_login field
      const { data: userlogin, error } = await supabase
        .from('users')
        .select('last_login')
        .eq('username', username.toLowerCase())
        .single();

      if (error || !userlogin) {
        Alert.alert('Error', 'Unable to fetch user data.');
        return;
      }

      // Navigate to the appropriate screen
      if (!userlogin.last_login) {
        // If it's the user's first login, navigate to the Onboarding screen
        navigation.navigate('Onboarding1');
      } else {
        // If the user has logged in before, navigate to the Profile screen
        navigation.navigate('Onboarding1');
      }

      // After navigation, update the last_login field in the database
      const { error: updateError } = await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('username', username.toLowerCase());

      if (updateError) {
        throw new Error('Failed to update last login');
      }

    } catch (error) {
      Alert.alert('Login Failed', error.message);  // Show error if login fails
  }
};

  // Handle external link navigation
  const openWebLink = () => {
    const url = 'https://www.ravewithboomerang.com';  // The external web link you want to navigate to
    Linking.openURL(url)
      .catch(err => console.error("Failed to open URL:", err));  // Error handling
  };


  return (
    <View style={globalStyles.container}>
      <Image
        source={require('../assets/images/logo.png')}  // Use require to load the local image
        contentFit="center"
        style={{ position: "absolute", top: 80, width: 100, height: 100, marginBottom: 40 }}  // Define width and height
      />  

      <Text style={globalStyles.headerText}>RAVER'S DIARY</Text>
      <Text style={globalStyles.subheaderText}>LOG IN</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        selectionColor='#1ce069'
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        selectionColor='#1ce069'
        secureTextEntry
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={globalStyles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={[globalStyles.linkText, styles.signupText]}>Don't have an account? Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openWebLink}>
        <Text style={[globalStyles.linkText, styles.boomerangText]}>Powered by Boomerang</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signupText: {
    marginTop: 20,  // Adjusts the vertical position of the text
  },
  boomerangText: {
    bottom: -150,  // Adjusts the vertical position of the text
  },
});
