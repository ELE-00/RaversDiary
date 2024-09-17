import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseClient';  // Import Supabase
import CryptoJS from 'crypto-js';  // Import CryptoJS for password hashing

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));  // Load user from AsyncStorage if available
      }
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    // Hash the input password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Supabase login logic (validate the user)
    const { data: user, error } = await supabase
      .from('users')
      .select('username, password, last_login')
      .eq('username', username.toLowerCase())
      .single();

    if (error || !user) {
      throw new Error('Invalid username/password');  // Handle login error
    }

    if (user.password !== hashedPassword) {
      throw new Error('Invalid username/password');  // Handle incorrect password
    }


    // Save the username in state and AsyncStorage
    const userData = { username };
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    return userData;  // Return user data if needed
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
