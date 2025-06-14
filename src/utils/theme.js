// theme.js

import { StyleSheet } from 'react-native';

const colors = {
  primary: '#1ce069',  // For buttons, highlights, etc.
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
    backgroundColor: 'rgba(17, 34, 17, 1)',
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

  //Boomerang Page 
  BheaderText: {
    fontFamily: fonts.header,
    fontSize: 35,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'center',
  },
  BsubheaderText: {
    fontFamily: fonts.header,
    fontSize: 17,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 15,
    
  },
  BbodyText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 20
  },
  BcardheaderText: {
    fontFamily: fonts.header,
    fontSize: 15,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  
  //Checklist Page
  CLcheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
    fontFamily: fonts.body,
    borderBottomColor: '#1A1A1A',
    borderBottomWidth: 1,

  },
  CLText: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  CLheaderText: {
    fontFamily: fonts.header,
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 16,
  },
  CLsubheaderText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular', // Custom font
    color: '#FFF',
    marginBottom: 15,
  },
  CLdivider: {
    borderBottomColor: '#1AC069',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },

  CLmodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  CLmodalContent: {
    width: '80%',
    backgroundColor: 'black',
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 20,
  },
  CLinput: {
    height: 50,
    backgroundColor: '#222',
    color: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: fonts.body,
  },
  CLaddButton: {
    backgroundColor: '#1ce069',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  CLaddButtonText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: '#000',    
  },
  CLcloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#aaa',
    borderRadius: 5,
    alignItems: 'center',
  },
  CLcloseButtonText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: '#000',
  },
  CLcontainer: {
    flex: 1,
  },
  CLlist: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  CLitemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  CLitemText: {
    fontSize: 18,
    color: 'white',
  },
  CLfab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1ce069',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CLfabText: {
    fontSize: 35,
    color: 'black',
  },

//My Events page
  MEcontainer: {
    flex: 1,
  },


  MEheaderContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  MEheaderText: {
    fontFamily: fonts.header,
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    paddingLeft: 16,
  },

  MEdivider: {
    borderColor: 'rgb(27, 149, 88)',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },

  MEsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold', 
    color: colors.primary,
    marginBottom: 8,
    paddingLeft: 16,
  },
  MEeventItem: {
    flex: 1 / 3,
    alignItems: 'center',
    marginVertical: 12,
  },
  MEeventImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // makes it circular
    marginBottom: 6,
  },
  MEeventName: {
    color: 'white',
    fontSize: 14,
  },
  MEeventDate: {
    color: '#999',
    fontSize: 12,
  },

  MEeventLogo: {
    width: 70,
    height: 70,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: 'rgb(77, 77, 77)',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  MEaddEventBtn: {
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 20,
    borderRadius: 40, // makes it circular
    alignSelf: 'flex-end',
  },

  MEaddEventBtnText: {
    fontSize: 45,
    color: '#1ce069',
  },

  MEsearchbar: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(28, 224, 106, 0.1)',
    color: '#1ce069',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'ChakraPetch-Regular',
  },

},);

export { colors, fonts, globalStyles };