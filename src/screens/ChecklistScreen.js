import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, TextInput, StyleSheet, Modal } from 'react-native';
import { supabase } from '../utils/supabaseClient';  // Import Supabase client
import { globalStyles } from '../utils/theme';  // Global styles if you have them
import { AuthContext } from '../utils/AuthContext';  // Import the AuthContext
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ChecklistScreen({ navigation }) {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // Store user_id for profile saving
  const { user } = useContext(AuthContext); // Access the logged-in user
  const [modalVisible, setModalVisible] = useState(false);
  const [itemChecked, setItemChecked] = useState(false);

  // Fetch user id and Checklist when the component mounts
  useEffect(() => {
    fetchUserID();
  }, []); // This will run only once when the component mounts

  // Fetch checklist only when userId is available
useEffect(() => {
  if (userId) {
    fetchChecklist();
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

  // Fetch checklist
  const fetchChecklist = async () => {
    const { data, error } = await supabase
      .from("checklistitems")
      .select("*")
      .eq("user_id", userId);

    if (error) console.log("Error fetching user checklist", error);
    else setChecklist(data);
  };

  // Add items
  const addItem = async () => {
    if (newItem.trim() === "") return; // prevent empty items
    setLoading(true);
    const { data, error } = await supabase
      .from("checklistitems") // Make sure this matches your table name
      .insert([{ user_id: userId, item_name: newItem, checkbox: false}]); // Adjust the fields accordingly
    setLoading(false);
    if (error) {
      console.log("Error adding item", error);
    } else {
      setNewItem(""); // Clear input
      setModalVisible(false); // Close the modal
      fetchChecklist(); // refresh the list
    }
  };


  //Updated the Checkbox status in databse
  const updateCheckboxStatus = async (item_id, currentStatus) => {
    const {error} = await supabase
    .from("checklistitems")
    .update({ checkbox: !currentStatus})
    .eq("item_id", item_id);

    if (error) {
      console.log("Failed to update checkbox status")
    } else {
      fetchChecklist(); // refresh the list
    }
  };

  // Render each list item
  const renderItem = ({ item }) => (
    <View style={globalStyles.CLcheckboxContainer}>

      <BouncyCheckbox 
          size={20}
          fillColor='#1ce069'
          unFillColor='#000'
          isChecked={item.checkbox}
          text={item.item_name}
          iconStyle={{ borderColor: '#aaa' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={[
            globalStyles.CLText, 
            item.checkbox && { textDecorationLine: 'line-through', color: '#aaa' }  // Strike-through and gray text if checked
          ]}
          onPress={() => updateCheckboxStatus(item.item_id, item.checkbox)}
        />

    </View>
  );

  return (
    <SafeAreaView style={globalStyles.CLcontainer}>
      <Text style = {globalStyles.CLheaderText}>MY PRE RAVE CHECKLIST</Text>
      <Text style = {globalStyles.CLsubheaderText}>Never forget your rave essentials!</Text>
      
      {/* Divider */}
      <View style={globalStyles.CLdivider} />
        

      <FlatList
        data={checklist}
        //keyExtractor={item => item.item_id.toString()} // Ensure each item has a unique key
        renderItem={renderItem}
        contentContainerStyle={styles.CLlist}
      />


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={globalStyles.CLmodalContainer}>
          <View style={globalStyles.CLmodalContent}>
            <TextInput
              placeholder="Add new Item..."
              placeholderTextColor="#aaa"
              selectionColor='#1ce069'
              value={newItem}
              onChangeText={setNewItem}
              style={globalStyles.CLinput}
            />

            <TouchableOpacity onPress={addItem} style={globalStyles.CLaddButton}>
              <Text style={globalStyles.CLaddButtonText}>{loading ? "Adding..." : "Add Item"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={globalStyles.CLcloseButton}>
              <Text style={globalStyles.CLcloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>  


      <TouchableOpacity style={globalStyles.CLfab} onPress={() => setModalVisible(true)}> 
        <Text style={globalStyles.CLfabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({



});
