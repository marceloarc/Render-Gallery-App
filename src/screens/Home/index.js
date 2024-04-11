import React from "react";

import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import SearchBar from "../../../components/SearchBar";
import { Ionicons } from '@expo/vector-icons';
import { getCategories } from "../../../services/CategoryService";
import { Posts } from "../../../components/Posts";

  const categories = getCategories();

export default function Home() {

    const handleFilterPress = () => {
        console.log('Botão de filtros pressionado!');
      };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name={item.icon} size={15} color="#fff" />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SearchBar onFilterPress={handleFilterPress} />
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
            />
            <Posts />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    categoriesList: {
      height: 38,
      left: 20,
      marginBottom: 20,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#000',
      borderWidth: 1,
      borderColor: '#ededed',
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
    },
    categoryText: {
      color: '#ededed',
      marginLeft: 5,
      fontSize: 12,
    },
  });

