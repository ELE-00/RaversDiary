// theme.js

import { StyleSheet } from 'react-native';

const colors = {
  primary: '#1ce069',  // For buttons, highlights, etc.
  background: '#000',  // Global background color
  textPrimary: '#fff', // For primary text color
  textSecondary: '#aaa', // For secondary text color
};

const fonts = {
  header: 'microgramma-bold',  // Global header font
  header_normal: 'Microgramma Normal',  // Global header font
  body: 'ChakraPetch-Regular',  // Global body font
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerText: {
    fontFamily: fonts.header,
    fontSize: 28,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  subheaderText: {
    fontFamily: fonts.header,
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  bodyText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.textPrimary,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#222',
    color: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: fonts.body,
  },
  button: {
    width: '40%',
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontFamily: fonts.body,
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkText: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  TCPPText: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 12,
  },
  TCPPLink: {
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 12,  
    textDecorationLine: 'underline',  
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  backButtonText: {
    fontSize: 30,
    color: colors.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 50,
    fontFamily: fonts.body,
  },

  
});

export { colors, fonts, globalStyles };