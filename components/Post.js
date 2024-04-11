import React, { useEffect, useState } from "react";

import { View, Image, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';


export function Post({id, name, user, price, image}) {

    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        Image.getSize(image, (width, height) => {
            setAspectRatio(width / height);
        });
    }, []);

    return (
        <View style={styles.container}>
        <Image source={{ uri: image }} style={[styles.image, {aspectRatio}] } />

            <View style={styles.footer} >
                <Text style={styles.title} >{name}</Text>
                <Feather name="heart" size={24} color="white" />
                {/* <Text>{ProductsService[0].description}</Text>
                <Text>{ProductsService[0].price}</Text> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
        flex: 1,
        padding: 5,
    },
        image: {
        borderRadius: 22,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 7,
    },
    title: {
        color: 'white',
        fontSize: 14,
    },
});


