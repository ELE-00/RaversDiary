import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, TextInput, StyleSheet, Modal, Image } from 'react-native';
import { supabase } from '../utils/supabaseClient';  // Import Supabase client
import { globalStyles } from '../utils/theme';  // Global styles if you have them
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext
import GradientBackground from '../components/GradientBackground';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

//Create user_events DB
//Create two containers: Upcoming, Past events
//Events with date >Today goes to Upcoming
// <Today to past events


const MyEventsScreen = () => {
  const [userId, setUserId] = useState(null); // Store user_id for profile saving
  const {user} = useContext(AuthContext);
  const [events, setEvents] = useState([]);  // State to hold all genres from the database
  const navigation = useNavigation(); // Hook to navigate between screens
  const [filteredEvents, setFilteredEvents] = useState([]);  // State to hold filtered genres based on search
  const [searchQuery, setSearchQuery] = useState('');  // State to store the search query

    // Fetch user id when the component mounts
  useEffect(() => {
    fetchUserID();
  }, []); // This will run only once when the component mounts

  // Fetch user events once userId is available
  useEffect(() => {
    if(userId){
      fetchEvents();
    }
}, [userId]); // This will run when userId changes


  // Fetch user id
  const fetchUserID = async () => {
    try {
      if (user && user.username) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("user_id")
          .eq('username', user.username.toLowerCase())
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

  //Fetch user events
  const fetchEvents = async () => {
      const {data, error } = await supabase
        .from("user_events")
        .select("*")
        .eq("user_id", userId)
        
      if (error) console.log("Error fetching user events", error);
      else setEvents(data);
  };


  //Event search functionality
  const handleSearch = (query) => {
    // Filter genres based on search query
    setSearchQuery(query); // Update search query
    const filtered = events.filter(event =>
      event.event_name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive search
    );
    setFilteredEvents(filtered); // Update filtered genres
  };

  //Seperating Upcoming and Past events
  const today = new Date();
  const upcomingEvents = filteredEvents.filter(e => new Date(e.event_date) >=today);
  const pastEvents = filteredEvents.filter(e => new Date(e.event_date) < today);

  //Date formater
  events.map((event) => {
    const formattedDate = format(new Date(event.event_date), "dd/MM/yyyy");
    return <Text>{formattedDate}</Text>;
  })



  //Event Grid Section
  const EventGridSection = ({title, data}) => (
    <View style={{ marginBottom: 24}}>
      <Text style={globalStyles.MEsectionTitle}>{title}</Text>
      <FlatList
        data = {data}
        numColumns={3}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem= {({item}) => {

          //Date formatter
          const date = new Date(item.event_date);
          const formattedDate = format(date, "dd/MM/yyyy");

          return(
          <View style= {globalStyles.MEeventItem}>
            <Image
              source= {{uri: item.event_logo}}
              style = {globalStyles.MEeventLogo}
            />
            <Text style={globalStyles.MEeventName} numberOfLines={1}>
              {item.event_name}
            </Text>
            <Text style={globalStyles.MEeventDate}>
              {formattedDate}
            </Text>                    
          </View>
          )
        }}
      /> 
    </View>
  );



  return (
    <GradientBackground>
      <SafeAreaView style={globalStyles.MEcontainer}>

        <View style={globalStyles.MEheaderContainer}>
          <Text style = {globalStyles.MEheaderText}>MY EVENTS</Text>      
          <TouchableOpacity style={globalStyles.MEaddEventBtn} onPress={() => navigation.navigate('AddEvent')}>
            <Text style={globalStyles.MEaddEventBtnText}>+</Text>
          </TouchableOpacity>
          
        </View>


        {/* Search Bar for filtering genres */}
        <TextInput
          style={globalStyles.MEsearchbar}
          placeholder="Search events..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
          selectionColor='#1ce069'
        />

        <EventGridSection title={`My upcoming events (${upcomingEvents.length})`} data={upcomingEvents} />
        <EventGridSection title={`My past events(${pastEvents.length})`} data={pastEvents} />

      </SafeAreaView>
    </GradientBackground> 
  );
};



export default MyEventsScreen;
