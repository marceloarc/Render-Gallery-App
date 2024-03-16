import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity  } from 'react-native';

import { FavContext } from '../context/FavContext';

export function Favorites ({navigation}) {

  const {items, getItemsCount, getTotalPrice} = useContext(FavContext);
  
  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getItemsCount());
    });
    return (
       <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total de artes favoritas</Text>
          <Text style={styles.lineRight}>{total}</Text>
       </View>
    );
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity style={styles.cartLine} onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: item.product.id,
        });
      }} >
           <Image
        style={styles.thumb}
        source={item.product.image}
      />
          <Text style={styles.lineLeft}>{item.product.name}</Text>
          <Text style={styles.lineRight}> {item.totalPrice}</Text>
       </TouchableOpacity>
    );
  }
  
  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product.id.toString()}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: { 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
  },
  lineLeft: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
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
    margin:5,
    width: 50,
    resizeMode:"cover",
  },
});
