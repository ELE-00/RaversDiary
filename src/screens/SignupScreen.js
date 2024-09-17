import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../utils/theme';  // Import the global styles
import { supabase } from '../utils/supabaseClient';  // Import the Supabase client
import CryptoJS from 'crypto-js';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Image } from 'expo-image';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  const handleSignup = async () => {
    // Convert email and username to lowercase
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseUsername = username.toLowerCase();

    // Step 1: Check if email exists
    const { data: emailCheck, error: emailError } = await supabase
      .from('users')
      .select('email')
      .eq('email', lowerCaseEmail);

    if (emailCheck.length > 0) {
      Alert.alert("Error", "Email already exists.");
      return;
    }

    // Step 2: Check if username exists
    const { data: usernameCheck, error: usernameError } = await supabase
      .from('users')
      .select('username')
      .eq('username', lowerCaseUsername);

    if (usernameCheck.length > 0) {
      Alert.alert("Error", "Username already exists.");
      return;
    }

    // Step 3: Validate username format
    if (!validateUsername(lowerCaseUsername)) {
      Alert.alert("Error", "Invalid username format. Should be 3-16 characters long, start with an alphabet, and can include alphabets, numbers, or underscores.");
      return;
    }

    // Step 4: Validate password format
    if (!validatePassword(password)) {
      Alert.alert("Error", "Invalid password format. Password should be 6-12 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character [@$!%*#?&._].");
      return;
    }

    // Step 5: Check if terms and conditions are accepted
    if (!termsChecked) {
      Alert.alert("Error", "Please agree to the Terms and Conditions.");
      return;
    }

    // Hash the password using SHA-256
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        email: lowerCaseEmail, 
        username: lowerCaseUsername, 
        password: hashedPassword, 
        created_at: new Date().toISOString() 
      }]);

    if (error) {
      console.error("Insert Error:", error);
      Alert.alert("Error", "Failed to register user.");
    } else {
      console.log("Insert Success:", data);
      Alert.alert("Success", "User registered successfully.");
      navigation.navigate('Login'); // Navigate to login or another screen
    }
  };

  const validateUsername = (username) => {
    // Check username format
    return /^[A-Za-z][A-Za-z0-9_]{2,15}$/.test(username);
  };

  const validatePassword = (password) => {
    // Check password format
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&._])[\w\d@$!%*#?&._]{6,12}$/.test(password);
  };

  return (
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
  );
}
