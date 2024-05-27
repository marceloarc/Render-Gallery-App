import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavContext } from '../../../context/FavContext';

export default function Favorites() {
  const { items, getTotalPrice } = useContext(FavContext);
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.cartLine} onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: item.id, // Passa o ID do produto ao invés do ID do item
        });
      }} >
        <Image
          style={styles.thumb}
          source={{ uri: item.path }} // Ajusta a fonte da imagem
        />
        <Text style={styles.lineLeft}>{item.nomeProduto}</Text> 
        <Text style={styles.lineRight}> {item.price}</Text> 
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} 
    />
  );
}

const styles = StyleSheet.create({
  cartLine: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333'
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  thumb: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    margin: 5,
    width: 50,
    resizeMode: "cover",
  },
});
