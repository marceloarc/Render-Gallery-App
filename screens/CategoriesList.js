import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { Category } from '../components/Category.js';
import { getCategories } from '../services/CategoryService.js';

export function CategoriesList ({navigation}) {

  function renderCategory({item: category}) {
    return (
      <Category {...category} 
      onPress={() => {
        navigation.navigate('ProductsList', {
          CategoryId: category.id,
        });
      }}
      />
    );
  }
  
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    setCategories(getCategories());
  });
  
  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={categories}
      renderItem={renderCategory}
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
