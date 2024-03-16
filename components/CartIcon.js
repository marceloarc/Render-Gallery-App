
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CartContext } from '../context/CartContext';

export function CartIcon({navigation}) {
  const {getItemsCount} = useContext(CartContext);
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text} 
        onPress={() => {
          navigation.navigate('Cart');
        }}
      ><Icon name="shopping-cart" size={22} color="#3498DB" /> ({getItemsCount()})</Text>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'black',
    height: 40,

  
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#3498DB',
    fontWeight: 'bold',
  },
});
