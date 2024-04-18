import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const SearchBar = ({ onFilterPress }) => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (text) => {
    setSearchText(text);
  };
  const handleSearchSubmit = () => {
    // Envia o texto de pesquisa para o componente pai
    onFilterPress(searchText);
  };
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
        <TouchableOpacity onPress={handleSearchSubmit} style={styles.filterButton}>
            <Image source={require('../assets/System/filter-desactive.png')} style={{width: 48, height: 49}} />
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
      borderColor: '#ededed',
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