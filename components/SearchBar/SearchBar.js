import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from "./useThemedStyles";
import { useTheme } from '../../ThemeContext';

const SearchBar = ({onFilterPress, onTextChange}) => {

  const { themeStyles,theme } = useTheme();
  const styles = useThemedStyles();
  const [searchText, setSearchText] = useState('');
  const [visibilityC, setVisibility] = useState(false);
  const handleSearchChange = (text) => {
    console.log(visibilityC);
    setSearchText(text);
    onTextChange(text);
  };

  const handleVisibility = (visibility) =>{
    const updatedVisibility = !visibilityC; // Novo valor de visibilidade
    setVisibility(updatedVisibility); // Atualiza o estado com o novo valor
    onFilterPress(updatedVisibility); // Chama onFilterPress com o novo valor de visibilidade
  }
  let imageSource = '';
  if(theme != 'dark'){
     imageSource = visibilityC ? require('../../assets/System/filter-active-light.png') : require('../../assets/System/filter-desactive-light.png');
  }else{
    imageSource = visibilityC ? require('../../assets/System/filter-active.png') : require('../../assets/System/filter-desactive.png');
  }
    return (
      <View style={styles.container}>
        <View style={styles.inputSection}>
          <Ionicons name="ios-search" style={styles.searchIcon} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor= {themeStyles.colors.borderSearch}
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
  
  export default SearchBar;