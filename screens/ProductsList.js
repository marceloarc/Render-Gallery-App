import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { Product } from '../components/Product.js';
import { getProducts, getProductsByCategory } from '../services/ProductsService.js';

export function ProductsList ({navigation,route}) {

  function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      />
    );
  }
  
  const [products, setProducts] = useState([]);
  const CategoryId = route.params.CategoryId;
  useEffect(() => {
    setProducts(getProductsByCategory(CategoryId));
  },[]);
  
  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: 'black',
  },
  productsListContainer: {
    backgroundColor: 'black',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
