import React from "react";

import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import SearchBar from "../../../components/SearchBar";
import { Ionicons } from '@expo/vector-icons';

    const categories = [
        { id: '1', name: 'Eletrônicos', icon: 'ios-phone-portrait' },
        { id: '2', name: 'Roupas', icon: 'ios-shirt' },
        { id: '3', name: 'Comida', icon: 'ios-pizza' },
        { id: '4', name: 'Livros', icon: 'ios-book' },
        { id: '5', name: 'Esportes', icon: 'ios-football'},
        { id: '6', name: 'Jogos', icon: 'ios-game-controller' },
    ];

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

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <View style={styles.likesContainer}>
                <Ionicons name="ios-heart" size={15} color="#ff0000" />
                <Text style={styles.likesText}>{item.likes}</Text>
            </View>
        </View>
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

