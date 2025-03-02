import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'; // Import necessary React Native components
import { supabase } from '../utils/supabaseClient';  // Import Supabase client for database operations
import { globalStyles } from '../utils/theme';  // Global styles for consistent design
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext to get logged-in user data

export default function GenreSelectionScreen({ route, navigation }) {
    const { user } = useContext(AuthContext);  // Access the logged-in user data from AuthContext
    const [genres, setGenres] = useState([]);  // State to hold all genres from the database
    const [filteredGenres, setFilteredGenres] = useState([]);  // State to hold filtered genres based on search
    const [searchQuery, setSearchQuery] = useState('');  // State to store the search query
    const [selectedGenres, setSelectedGenres] = useState([]);  // State to store genres selected by the user
    const [userId, setUserId] = useState(null);  // State to store the User ID
    const { fromPage } = route.params;  // Extract 'fromPage' value from route params to determine navigation flow
    
    useEffect(() => {
      if (user) {
        // Fetch user data and genres if user is available
        fetchUserData();
        fetchGenres();
      }
    }, [user]);
  
    const fetchGenres = async () => {
      // Fetch all genres from the 'genres' table
      const { data, error } = await supabase
        .from('genres')
        .select('*');  // Adjust the query as per your "genres" table structure
  
      if (error) {
        console.error(error);
        Alert.alert('Error', 'Could not fetch genres.');
      } else {
        setGenres(data); // Store all genres in the state
        setFilteredGenres(data);  // Initially, all genres will be shown
      }
    };
  
    const fetchUserData = async () => {
        try {
          // Fetch user ID from the 'users' table using username
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id')
            .eq('username', user.username.toLowerCase())
            .single();
          
          if (userError || !userData) {
            console.warn('User data not found. Proceeding without user genres.');
            setUserId(null); // Set userId to null or handle accordingly
            // Continue even if user data is not found
            return;
          }
      
          setUserId(userData.user_id); // Set user ID in state
      
          // Fetch user's selected genres from 'profile_data' table
          const { data: profileData, error: profileError } = await supabase
            .from('profile_data')
            .select('usergenres')
            .eq('user_id', userData.user_id)
            .single();
          
          if (profileError) {
            console.warn('Error fetching user genres. Proceeding with empty genres.');
            setSelectedGenres([]); // Set empty genres if error occurs
          } else if (profileData && profileData.usergenres) {
            try {
              // Parse the user genres and update selected genres
              const parsedGenres = typeof profileData.usergenres === 'string'
                ? JSON.parse(profileData.usergenres)
                : profileData.usergenres;
      
              if (Array.isArray(parsedGenres)) {
                setSelectedGenres(parsedGenres); // Set parsed genres in state
              } else {
                setSelectedGenres([]); // Handle invalid genre data
              }
            } catch (parseError) {
              console.error('Error parsing user genres:', parseError);
              setSelectedGenres([]); // Set empty genres in case of parsing error
            }
          } else {
            setSelectedGenres([]); // Handle empty or missing user genres
          }
        } catch (error) {
          console.error('Unexpected error in fetchUserData:', error);

        }
      };
  
    const handleSearch = (query) => {
      // Filter genres based on search query
      setSearchQuery(query); // Update search query
      const filtered = genres.filter(genre =>
        genre.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive search
      );
      setFilteredGenres(filtered); // Update filtered genres
    };
  
    const handleSelectGenre = (genre) => {
      // Toggle genre selection when clicked
      if (selectedGenres.includes(genre)) {
        setSelectedGenres(selectedGenres.filter(item => item !== genre)); // Remove from selected
      } else if (selectedGenres.length < 5) {
        setSelectedGenres([...selectedGenres, genre]); // Add genre to selected if less than 5
      } else {
        Alert.alert('You can select up to 5 genres only.'); // Restrict to 5 genres
      }
    };
  
    const saveGenres = async () => {
      if (userId) {
        if (selectedGenres.length > 0) {
          // Save selected genres to the database
          const { error } = await supabase
            .from('profile_data')
            .upsert({ user_id: userId, usergenres: selectedGenres });
  
          if (error) {
            Alert.alert('Error', 'Failed to save genres.'); // Handle errors
          } else {
            navigation.goBack(); // Go back to previous screen if success
          }
        } else {
          Alert.alert('Error', 'Please select at least one genre.'); // Handle case where no genre is selected
        }
      } else {
        Alert.alert('Error', 'User ID is not set.'); // Handle missing user ID
      }
    };
  
    const renderGenreItem = ({ item }) => (
      <TouchableOpacity
        key={item.genre_id}
        style={[
          styles.genreItem,
          selectedGenres.includes(item.name) ? styles.selectedGenreItem : null // Highlight selected genres
        ]}
        onPress={() => handleSelectGenre(item.name)} // Handle genre selection
      >
        <Text style={styles.genreText}>{item.name}</Text>
      </TouchableOpacity>
    );
  

  return (
    <View style={styles.container}>
        {/* Back Button to navigate to previous screen */}
        <TouchableOpacity style={globalStyles.backButton} onPress={() => {
        if (fromPage === 'Onboarding1') {
            navigation.navigate('Onboarding1');  // Navigate to onboarding screen
        } else if (fromPage === 'ProfileEdit') {
            navigation.navigate('ProfileEdit'); // Navigate to profile edit screen
        } else {
            console.warn('Unexpected fromPage value:', fromPage); // Handle unexpected 'fromPage' value
            navigation.goBack();  // Fallback to go back to the previous screen
        }
        }}>
        <Text style={globalStyles.backButtonText}>←</Text>
        </TouchableOpacity>


      {/* Search Bar for filtering genres */}
      <TextInput
        style={styles.searchbar}
        placeholder="Search genres..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={handleSearch}
        selectionColor='#1ce069'
      />

      {/* Selected Genres Display */}
      <Text style={styles.selectedText}>Selected Genres ({selectedGenres.length}/5):</Text>
      <View style={styles.selectedContainer}>
        {selectedGenres.map((genre, index) => (
          <Text key={index} style={styles.selectedGenre}>{genre}</Text> // Display each selected genre
        ))}
      </View>

      {/* Genre Suggestions List - Horizontal Wrapping */}
      <View style={styles.genresContainer}>
        {filteredGenres.map((genre) => renderGenreItem({ item: genre }))}  
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={saveGenres}
      >
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  searchbar: {
    position: 'absolute',
    top: 100,
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    color: '#1ce069',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'ChakraPetch-Regular',
  },
  selectedText: {
    position: 'absolute',
    top: 180,
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
  },
  selectedContainer: {
    position: 'absolute',
    top: 210,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  selectedGenre: {
    backgroundColor: '#1ce069',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  genreItem: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: "#2a2a2a",
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
  },
  selectedGenreItem: {
    backgroundColor: '#1ce069',
  },
  button: {
    position: 'absolute',
    bottom: 180,
    width: '40%',
    height: 40,
    backgroundColor: '#1ce069',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
