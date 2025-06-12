import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'; // Import necessary React Native components
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import { supabase } from '../utils/supabaseClient';  // Import Supabase client for database operations
import CryptoJS from 'crypto-js'; // Import CryptoJS for password hashing
import BouncyCheckbox from "react-native-bouncy-checkbox"; // Import BouncyCheckbox for checkbox functionality
import GradientBackground from '../components/GradientBackground';

// SignupScreen component
export default function SignupScreen() {
  const navigation = useNavigation(); // Hook to navigate between screens
  const [email, setEmail] = useState(''); // State for storing email input
  const [username, setUsername] = useState(''); // State for storing username input
  const [password, setPassword] = useState(''); // State for storing password input
  const [termsChecked, setTermsChecked] = useState(false); // State for checking terms acceptance
  const [marketingChecked, setMarketingChecked] = useState(false); // State for marketing consent checkbox

  // Function to handle the signup process
  const handleSignup = async () => {
    // Step 1: Normalize the email and username to lowercase
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseUsername = username.toLowerCase();

    // Step 2: Check if email already exists in the database
    const { data: emailCheck, error: emailError } = await supabase
      .from('users')
      .select('email')
      .eq('email', lowerCaseEmail);

    // If email exists, show an error message
    if (emailCheck.length > 0) {
      Alert.alert("Error", "Email already exists.");
      return;
    }

    // Step 3: Check if username already exists in the database
    const { data: usernameCheck, error: usernameError } = await supabase
      .from('users')
      .select('username')
      .eq('username', lowerCaseUsername);

    // If username exists, show an error message    
    if (usernameCheck.length > 0) {
      Alert.alert("Error", "Username already exists.");
      return;
    }

    // Step 4: Validate the username format
    if (!validateUsername(lowerCaseUsername)) {
      Alert.alert("Error", "Invalid username format. Should be 3-16 characters long, start with an alphabet, and can include alphabets, numbers, or underscores.");
      return;
    }

    // Step 5: Validate the password format
    if (!validatePassword(password)) {
      Alert.alert("Error", "Invalid password format. Password should be 6-12 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character [@$!%*#?&._].");
      return;
    }

    // Step 6: Ensure the terms and conditions checkbox is checked
    if (!termsChecked) {
      Alert.alert("Error", "Please agree to the Terms and Conditions.");
      return;
    }

    // Step 7: Hash the password using SHA-256 for security
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Step 8: Insert the user's data into the 'users' table in Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        email: lowerCaseEmail, 
        username: lowerCaseUsername, 
        password: hashedPassword, 
        created_at: new Date().toISOString() // Save the current timestamp for the creation date
      }]);

    // If there was an error during insert, display an error message
    if (error) {
      console.error("Insert Error:", error);
      Alert.alert("Error", "Failed to register user.");
    } else {
      // If successful, display a success message and navigate to the login screen
      console.log("Insert Success:", data);
      Alert.alert("Success", "User registered successfully.");
      navigation.navigate('Login'); // Navigate to login or another screen
    }
  };

  // Function to validate username format (3-16 characters, starts with a letter, can include alphabets, numbers, or underscores)
  const validateUsername = (username) => {
    return /^[A-Za-z][A-Za-z0-9_]{2,15}$/.test(username);
  };

  // Function to validate password format (6-12 characters, must include one digit, one uppercase letter, one lowercase letter, and one special character)
  const validatePassword = (password) => {
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&._])[\w\d@$!%*#?&._]{6,12}$/.test(password);
  };

  return (
    <GradientBackground>
      <View style={globalStyles.container}>

        <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.navigate('Login')}>
          <Text style={globalStyles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={globalStyles.headerText}>RAVER'S DIARY</Text>
        <Text style={globalStyles.subheaderText}>SIGN UP</Text>

        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          selectionColor='#1ce069'
        />

        <TextInput
          style={globalStyles.input}
          placeholder="@Username"
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
          secureTextEntry        
          selectionColor='#1ce069'
        />

        <View style={globalStyles.checkboxContainer}>
          <BouncyCheckbox 
            size={20}
            fillColor='#1ce069'
            unFillColor='#000'
            text={
              <Text style={globalStyles.TCPPText}>
                I agree to the <Text style={globalStyles.TCPPLink} onPress={() => navigation.navigate('TCP')}>Terms and Conditions and Privacy Policy</Text> 
              </Text>
            }

            iconStyle={{ borderColor: '#aaa' }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={globalStyles.TCPPText}
            onPress={() => setTermsChecked(!termsChecked)}
          />
        </View>

        <View style={globalStyles.checkboxContainer}>
          <BouncyCheckbox 
            size={20}
            fillColor='#1ce069'
            unFillColor='#000'
            text='I consent to receiving marketing emails'
            iconStyle={{ borderColor: '#aaa' }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={globalStyles.TCPPText}
            onPress={() => setMarketingChecked(!marketingChecked)}
          />
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
          <Text style={globalStyles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={globalStyles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

      </View>
    </GradientBackground>
  );
}
