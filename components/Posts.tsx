import React, { useState, useEffect } from "react"; // Adicione useState e useEffect aqui

import { StyleSheet, View, ScrollView } from "react-native";

import { Post } from "./Post";
import { getProducts }  from "../services/ProductsService";

export function Posts() {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    function postsByColumn(column: "right" | "left") {
        const rest = column === "left" ? 0 : 1;
        return products
            .filter((_, index) => index % 2 === rest)
            .map((product) => (
                <Post
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    user={product.user}
                    price={product.price}
                    image={product.image}
                />
            ));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
            <View  style={styles.container}>
                <View  style={styles.column}>
                { postsByColumn("right") }

                </View>
                <View  style={styles.column}>
                { postsByColumn("left") }

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
      },
      column: {
        flex: 1,
      },
      list: {
        paddingTop: 16,
      },
});


