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
 
  //Onboarding Styles
  OBstepText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'microgramma-bold', // Custom font
    color: 'rgba(28, 224, 105, 1)',
    marginTop: 20,
  },
  OBwelcomeText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'microgramma-bold', // Custom font
    color: 'rgba(28, 224, 105, 1)',
    marginTop: 10,
  },
  OBdescriptionText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular', // Custom font
    color: '#FFF',
    marginTop: 20,
  },
  OBsectionTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#FFF',
    marginTop: 30,
    marginBottom: 10,
  },
  OBprofilePic: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignSelf: 'center',
    marginTop: 10,
  },
  OBheaderImage: {
    width: 266,
    height: 120,
    alignSelf: 'center',
    marginTop: 10,
  },
  OBeditButton: {
    alignSelf: 'center',
    marginTop: 15,
  },
  OBeditButtonText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: 'rgba(28, 224, 105, 1)',
  },
  divider: {
    borderBottomColor: '#1A1A1A',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  OBnextButton: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(28, 224, 105, 1)',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  OBnextButtonText: {
    fontSize: 14,
    fontFamily: 'microgramma-bold', // Custom font
    color: '#000',
  },
  OBgenreButton: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(28, 224, 105, 1)',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  OBgenreButtonText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#000',
  },


});

export { colors, fonts, globalStyles };