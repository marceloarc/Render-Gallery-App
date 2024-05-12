import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../../context/CartContext';

export default function Cart () {

  const {items, getItemsCount, getTotalPrice} = useContext(CartContext);
  const navigation = useNavigation();
  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
       <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
 
       </View>
    );
  }

  function renderItem({item}) {
    return (
       <TouchableOpacity style={styles.cartLine} onPress={() => {
        navigation.navigate('Product', {
          ProductId: item.product.id,
        });
      }} >
        <Image
          style={styles.thumb}
          source={{ uri: item.product.image }}
        />
          <Text style={styles.lineLeft}>{item.product.name} x {item.qty}</Text>
          <Text style={styles.lineRight}>{item.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
       </TouchableOpacity >
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
