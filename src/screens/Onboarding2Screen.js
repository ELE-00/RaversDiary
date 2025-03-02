import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'; // Import necessary React Native components
import { globalStyles } from '../utils/theme'; // Import the global styles
import { supabase } from '../utils/supabaseClient'; // Import Supabase client for database operations
import { AuthContext } from '../utils/AuthContext'; // Import the AuthContext to get logged-in user data
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker for selecting images

export default function OnboardingScreen2({ navigation }) {
  // State variables to store profile and header images
  const [profilePic, setProfilePic] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [userId, setUserId] = useState(null); // Store user_id for profile saving
  const { user } = useContext(AuthContext); // Access the logged-in user from AuthContext
  const [permissionGranted, setPermissionGranted] = useState(false); // Track if permission is granted to access the photo library

  // Fetch user id when the component mounts
  useEffect(() => {
    fetchUserID(); // Fetch user ID once the component is mounted
  }, []); // This will run only once when the component mounts

  //Fetch user id from database
  const fetchUserID = async () => {
    try {
      if (user && user.username) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("user_id")
          .eq('username', user.username.toLowerCase()) // Fetch user ID based on the username
          .single();
  
        if (userError) {
          console.error("Error fetching user ID:", userError);
        } else if (userData) {
          setUserId(userData.user_id);  // Store the user_id in state
          console.log('Fetched User ID:', userData.user_id);  // Log user ID to console
        } else {
          console.warn('User not found.');
        }
      } else {
        console.warn('User information is missing.');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };
  
  
  // Function to request media library permissions
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Request permission to access photo library
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your camera roll to select images.');
      return false; // Return false if permission is not granted
    }
    setPermissionGranted(true); // Set permission state to true if granted
    return true;
  };

  // Reusable function to handle image picking
  const selectImage = async (setImageFunction) => {
    if (!permissionGranted) {
      const granted = await requestPermission(); // Request permission if not granted yet
      if (!granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Limit to image types only
      allowsEditing: true, // Allow the user to edit the image (resize, crop, etc.)
      aspect: [1, 1],
      quality: 1,
    });

    console.log('Full ImagePicker result:', result); // Log the result object for debugging

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri; // Get the URI of the selected image
      console.log('Image URI:', uri);
      setImageFunction(uri); // Set the selected image URI using the passed set function
    } else {
      console.log('Image selection cancelled or URI not available');
    }
  };

  // Directly upload the image without resizing
  const uploadImage = async (imageUri, filePath) => {
    try {
      console.log('Uploading image:', imageUri, 'to path:', filePath);
  
      // Upload the selected image to Supabase Storage
      const { data, error } = await supabase.storage
        .from('userprofile_images') // Ensure the bucket name is correct
        .upload(filePath, {
          uri: imageUri,
          type: 'image/jpeg',
          name: filePath.split('/').pop(),
        });
  
      // Log the response to check what's returned
      console.log('Upload response data:', data);
      console.log('Upload error (if any):', error);
  
      if (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Error', 'Failed to upload the image.');
        return null; // Return null on error
      }
  
      // Get the public URL of the uploaded image
      const { data: publicUrlData, error: urlError } = supabase.storage
      .from('userprofile_images')
      .getPublicUrl(filePath);
    
      const publicURL = publicUrlData?.publicUrl; // Access the public URL properly
  
      // Log the public URL retrieval result
      console.log('Public URL response:', publicURL);
      console.log('Public URL error (if any):', urlError);
  
      if (urlError) {
        console.error('Error getting public URL:', urlError);
        return null; // Return null if unable to get the public URL
      }
  
      return publicURL; // Return the public URL
    } catch (err) {
      console.error('Error uploading image:', err);
      Alert.alert('Error', 'Failed to upload the image.');
      return null;
    }
  };
  

  // Save button press handler to upload images and save to profile
  const handleSave = async () => {
    try {
      let profilePicUrl = null;
      let headerImageUrl = null;
  
      // Upload profile image or use default
      if (userId && profilePic) {
        const profilePicName = `profile-pic-${Date.now()}.jpg`; // Generate unique file name
        profilePicUrl = await uploadImage(profilePic, `${userId}/${profilePicName}`);
        console.log('Profile Pic uploaded:', profilePicUrl); // Log the returned URL
    
        if (!profilePicUrl) {
          console.error('Failed to upload profile picture.');
          return;
        }
      } else {
        // Use default profile image if not uploaded
        profilePicUrl = "https://xthuvmcrfvtozaoszyty.supabase.co/storage/v1/object/sign/userprofile_images/Default%20images/default_profileimage.png?token=...";
        console.log('Using default profile picture');
      }
  
      // Upload header image or use default
      if (userId && headerImage) {
        const headerImageName = `header-image-${Date.now()}.jpg`; // Generate unique file name
        headerImageUrl = await uploadImage(headerImage, `${userId}/${headerImageName}`);
        console.log('Header Image uploaded:', headerImageUrl); // Log the returned URL
    
        if (!headerImageUrl) {
          console.error('Failed to upload header image.');
          return;
        }
      } else {
        // Use default header image if not uploaded
        headerImageUrl = "https://xthuvmcrfvtozaoszyty.supabase.co/storage/v1/object/sign/userprofile_images/Default%20images/default_headerimage.png?token=...";
        console.log('Using default header image');
      }
  
      // Save image URLs in the profile_data table
      const profileData = {};
      if (profilePicUrl) profileData.profile_image = profilePicUrl;
      if (headerImageUrl) profileData.header_image = headerImageUrl;
  
      if (Object.keys(profileData).length > 0) {
        const { error } = await supabase
          .from('profile_data')
          .upsert({
            user_id: userId,
            ...profileData, // Spread the URLs into the profile data
          });
  
        if (error) {
          console.error("Error saving image URLs:", error);
        } else {
          console.log('Image URLs saved successfully!');
        }
      } else {
        console.warn('No images to save.');
      }
  
      // Navigate to the Profile page after saving
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving images:', error);
      Alert.alert('Error', 'Failed to save profile information.');
    }
  };
  
  
  
      







  return (
    <View style={globalStyles.container}>

      <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.navigate('Onboarding1')}>
        <Text style={globalStyles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Step Indicator */}
      <Text style={globalStyles.OBstepText}>2 OF 2</Text>

      {/* Welcome Text */}
      <Text style={globalStyles.OBwelcomeText}>WELCOME, RAVER!</Text>
      <Text style={globalStyles.OBsectionTitle}>Almost Set! This step is optional.</Text>



      {/* Profile Pic Section */}
      <Text style={globalStyles.OBsectionTitle}>4. Profile Pic: Show us your best rave look!</Text>

      {/* Profile Image */}
      <Image
        source={profilePic ? { uri: profilePic } : null} // Bind the profilePic URI to the Image
        style={{ width: 100, height: 100, borderRadius: 50 }} // Adjust the style as needed
      />

      <TouchableOpacity style={globalStyles.OBgenreButton} onPress={() => selectImage(setProfilePic)}>
        <Text style={globalStyles.OBgenreButtonText}>Choose Profile Image</Text>
      </TouchableOpacity>



      {/* Header Image Section */}
      <Text style={globalStyles.OBsectionTitle}>5. Header Image: Set the vibe with a cool banner.</Text>

      {/* Header Image */}
      <Image
        source={headerImage ? { uri: headerImage } : null} // Bind the profilePic URI to the Image
        style={{ width: 300, height: 100 }} // Adjust the style as needed
      />

      <TouchableOpacity style={globalStyles.OBgenreButton} onPress={() => selectImage(setHeaderImage)}>
        <Text style={globalStyles.OBgenreButtonText}>Choose Header Image</Text>
      </TouchableOpacity>



      {/* Divider */}
      <View style={globalStyles.divider} />

      {/* Next Button */}
      <TouchableOpacity style={globalStyles.OBnextButton} onPress={handleSave}>
        <Text style={globalStyles.OBnextButtonText}>SAVE</Text>
      </TouchableOpacity>

    </View>
  );
}
