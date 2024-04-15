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
            <View style={styles.flatListContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <Posts />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    flatListContainer: {
        height: 'auto', // Pode remover se ainda criar espaço extra
        marginBottom: 20,
        paddingLeft: 20, // Anteriormente era 'left', que não é apropriado para esse caso
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
