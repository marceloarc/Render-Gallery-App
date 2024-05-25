import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getProducts} from '../services/ProductsService';
import { Post } from './Post/Post';
import MasonryList from '@react-native-seoul/masonry-list';
import { useTheme } from '../ThemeContext';

export function Posts(props) {
    const [products, setProducts] = useState([]);
    const { themeStyles } = useTheme();

    useEffect(() => {
        setProducts(props.Products);
    }, [props.Products]);

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
        paddingBottom: 100,
    },
    
});
