import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import SearchBar from "../../../components/SearchBar";
import { Ionicons } from '@expo/vector-icons';
import { getCategories } from "../../../services/CategoryService";
import { Posts } from "../../../components/Posts";
import { useNavigation } from '@react-navigation/native';


  export default function Home({route}) {
    const categories = getCategories();
    const navigation = useNavigation();
    const CategoryId = route.params.CategoryId;
    const name= route.params.name;


    const handleFilterPress = (searchText) => {

        navigation.navigate('Home', {
            name: searchText,
            CategoryId:0
          })
    };
    

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity  onPress={() => navigation.navigate('Home', {
            CategoryId: item.id, name:'',
          })} style={styles.categoryItem}>
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
            <Posts  CategoryId={CategoryId} name={name}/>
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
        marginBottom: 10,
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
