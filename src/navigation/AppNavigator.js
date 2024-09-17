import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Onboarding1Screen from '../screens/Onboarding1Screen';
import Onboarding2Screen from '../screens/Onboarding2Screen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TCPScreen from '../screens/TCPScreen';
import GenreSelectionScreen from '../screens/GenreSelectionScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return ( 
    <Stack.Navigator initialRouteName="Login"> 
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding1" component={Onboarding1Screen} options={{ headerShown: false }} />  
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} options={{ headerShown: false }} />  
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />    
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TCP" component={TCPScreen} options={{ headerShown: false }} />  
      <Stack.Screen name="GenreSelection" component={GenreSelectionScreen} options={{ headerShown: false }} />               
    </Stack.Navigator>
  );
}

export default AppNavigator;
