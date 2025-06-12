// GradientBackground.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
      colors={['#1ce069', '#000']} // green to black gradient
      start={{ x: 6, y: -0.5 }}
      end={{ x: 0, y: 0.5 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
