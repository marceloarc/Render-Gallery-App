import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import filterImageDeac from '../assets/System/filter-desactive.png';
import filterImageAct from '../assets/System/filter-active.png';
import filterImageDeacLight from '../assets/System/filter-desactive-light.png';
import filterImageActLight from '../assets/System/filter-active-light.png';
const SearchBar = ({onFilterPress, onTextChange}) => {

  const [searchText, setSearchText] = useState('');
  const [visibilityC, setVisibility] = useState(false);
  const handleSearchChange = (text) => {

    setSearchText(text);
    onTextChange(text); 
  };
  const handleVisibility = (visibility) =>{
    const updatedVisibility = !visibilityC; // Novo valor de visibilidade
    setVisibility(updatedVisibility); // Atualiza o estado com o novo valor
    onFilterPress(updatedVisibility); // Chama onFilterPress com o novo valor de visibilidade
  }
  const imageSource = visibilityC ? require('../assets/System/filter-active.png') : require('../assets/System/filter-desactive.png');
    return (
      <View style={styles.container}>
        <View style={styles.inputSection}>
          <Ionicons name="ios-search" size={20} color="#878787" style={styles.searchIcon} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#878787"
            style={styles.input}
            onChangeText={handleSearchChange}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleVisibility}>
            <Image source={imageSource} style={{width: 48, height: 49}} />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputSection: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderColor: '#878787',
      borderWidth: 1,
      borderRadius: 12,
      alignItems: 'center',
      marginRight: 10,
      paddingHorizontal: 10,
      backgroundColor: '#000', 
      height: 48,
      left: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      color: '#ededed',
      backgroundColor: 'transparent',
      fontSize: 14,
    },
    filterButton: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      left: 7,
    },
  });
  
  export default SearchBar;