import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getProducts, filterProducts} from '../services/ProductsService';
import { Post } from './Post/Post';
import MasonryList from '@react-native-seoul/masonry-list'; // Usamos uma biblioteca alternativa que suporta esse tipo de layout
import { useTheme } from '../ThemeContext';

export function Posts(props) {
    const [products, setProducts] = useState([]);
    const { themeStyles } = useTheme();

    useEffect(() => {
        let products = filterProducts(props.CategoryId,props.name)

        setProducts(products);
    }, [props.CategoryId,props.name]);
    
    return (
        <View style={{flex: 1, backgroundColor: themeStyles.colors.background}}>
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
    list: {
        paddingHorizontal: 8,
        paddingTop: 16,
        flexGrow: 1,
    },
    
});
