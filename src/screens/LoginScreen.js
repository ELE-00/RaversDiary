import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabaseClient';  // Import the Supabase client
import { globalStyles } from '../utils/theme';  // Import the global styles
import { Image } from 'expo-image';
import CryptoJS from 'crypto-js';  // Import CryptoJS for password hashing

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Hash the input password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Fetch user data from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('username, password, last_login')
      .eq('username', username.toLowerCase())
      .single();

    if (error || !user) {
      Alert.alert('Invalid username/password');
      return;
    }

    // Verify the hashed password
    if (user.password !== hashedPassword) {
      Alert.alert('Invalid username/password');
      return;
    }

    // Update last_login if login is successful
    const { error: updateError } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('username', username.toLowerCase());

    if (updateError) {
      Alert.alert('Error', 'Failed to update last login.');
      return;
    }

    // Navigate to the appropriate screen
    if (!user.last_login) {
      navigation.navigate('Onboarding');  // Navigate to onboarding screen
    } else {
      navigation.navigate('Profile');  // Navigate to profile screen
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
        style={{ position: "absolute", top: 50, width: 200, height: 200, marginBottom: 40 }}  // Define width and height
      />  

      <Text style={globalStyles.headerText}>RAVER'S DIARY</Text>
      <Text style={globalStyles.subheaderText}>LOGIN IN</Text>

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
    bottom: -225,  // Adjusts the vertical position of the text
  },
});
