import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet
  } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { getProduct } from '../services/ProductsService.js';
import { CartContext } from '../context/CartContext';

export function ProductDetails({route}) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  const toast = useToast();
  const { addItemToCart } = useContext(CartContext);
  
  useEffect(() => {
    setProduct(getProduct(productId));
  });
  
  function onAddToCart() {
    addItemToCart(product.id);
    toast.show("Arte adicionada ao carrinho com sucesso!", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 1000,
      animationType: "slide-in",
    });
  }
  
  return (
    <SafeAreaView style={styles.background}> 
      <ScrollView>
        <Image
          style={styles.image}
          source={product.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>R$ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
            <Button
            onPress={onAddToCart}
            title="Adicionar ao carrinho"
            color="#3498DB"
            / >
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    
    backgroundColor:'black',
    height:'100%'
  },
  card: {
    backgroundColor: 'black',
    
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    marginTop:50,
    height: 300,
    width: '100%'
  },
  infoContainer: {
    
    padding: 16,
  },
  name: {
    color:'#3498DB',
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    color:'#3498DB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    
    fontSize: 16,
    fontWeight: '400',
    color:'#3498DB',
    marginBottom: 16,
  },
});
