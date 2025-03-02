import React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Linking, KeyboardAvoidingView } from 'react-native'; // Import necessary React Native components
import { globalStyles } from '../utils/theme';  // Import the global styles

// Function to open the Rave Recovery Kit link
const openweblinkRRK = () => {
    const url = "https://www.ravewithboomerang.com/shop/rave-recovery-kit";
    Linking.openURL(url) // Open the URL in the default browser
};

// Function to open the Power Gum Magnesium link
const openweblinkMG = () => {
    const url = "https://www.ravewithboomerang.com/shop/power-gum-magnesium";
    Linking.openURL(url) // Open the URL in the default browser
};


// BoomerangScreen component definition
const BoomerangScreen = () => {
  return (
    <SafeAreaView style ={styles.safeArea}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={globalStyles.BheaderText}>{"RAVE ON"} </Text>
                <Text style={globalStyles.BsubheaderText}>{"RECOVER STRONG"} </Text>
                <Text style={globalStyles.BbodyText}>{"Go all out on the dancefloor and wake up refreshed.\nOur routine ensures you stay on top of your game"} </Text>

                {/* TouchableOpacity to trigger URL opening for Rave Recovery Kit */}
                <TouchableOpacity style={styles.image} onPress={openweblinkRRK}>
                    {/* Image for the Rave Recovery Kit */}
                    <Image
                    source={require("../assets/images/RRKcover.png")}
                    style={styles.image}
                    resizeMode="cover" // Adjust the image to cover the container area
                    />
                </TouchableOpacity>

                {/* TouchableOpacity to trigger URL opening for Power Gum Magnesium */}
                <TouchableOpacity style={styles.image} onPress={openweblinkMG}>
                    {/* Image for the Power Gum Magnesium */}
                    <Image
                    source={require("../assets/images/MGcover.png")}
                    style={styles.image}
                    resizeMode="cover" // Adjust the image to cover the container area
                    />
                </TouchableOpacity>

            </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Ensure SafeAreaView takes up the full height of the screen
        backgroundColor: 'black', // Optional: Set background color if needed
      },
    container: {
        padding: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        flexGrow: 1,
    },

      image: {
        width: "100%",
        height: 500,
        marginBottom: 20,
        borderRadius: 20,
        borderColor: "white",
      },

})

export default BoomerangScreen;
