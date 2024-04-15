import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getProducts } from '../services/ProductsService';
import { Post } from './Post';
import MasonryList from '@react-native-seoul/masonry-list'; // Usamos uma biblioteca alternativa que suporta esse tipo de layout

export function Posts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const products = getProducts();
        setProducts(products);
    }, []);
    
    return (
        <View style={styles.container}>
            <MasonryList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Post {...item} />}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Correto
        backgroundColor: '#000',
    },
    list: {
        paddingHorizontal: 8,
        paddingTop: 16,
        flexGrow: 1, // Isso ajuda a garantir que o contentContainer preencha o espaço disponível
    },
    
});